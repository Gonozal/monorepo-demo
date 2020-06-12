import { CacheStrategy, RuleFunction } from './types';
import { GraphQLResolveInfo } from 'graphql';
import hashFunction from 'object-hash';

abstract class Resolvable<TContext, TSource, TArgs> {
  abstract async resolve(
    source: TSource,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ): Promise<boolean>;
}

export abstract class LogicRule<TContext, TSource, TArgs> extends Resolvable<
  TContext,
  TSource,
  TArgs
> {
  protected rules: Rule<TContext, TSource, TArgs>[];

  constructor(public name: string, ...rules: Rule<TContext, TSource, TArgs>[]) {
    super();
    this.rules = rules;
  }
}

export class Rule<TContext, TSource, TArgs> extends Resolvable<
  TContext,
  TSource,
  TArgs
> {
  public constructor(
    public name: string,
    public cacheStrategy: CacheStrategy,
    public ruleFunction: RuleFunction<TContext, TSource, TArgs>
  ) {
    super();
  }

  public async resolve(
    source: TSource,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ): Promise<boolean> {
    switch (this.cacheStrategy) {
      case 'none':
        return this.ruleFunction(source, args, context, info);
      case 'contextual':
        return this.resolveFromCache(this.name)(source, args, context, info);
      case 'strict':
        return this.resolveFromCache(`${this.name}-${this.hash(args, source)}`)(
          source,
          args,
          context,
          info
        );
    }
  }

  private resolveFromCache(
    key: string
  ): (
    source: TSource,
    args: TArgs,
    context: any,
    info: GraphQLResolveInfo
  ) => Promise<boolean> {
    return async (source, args, ctx, info) => {
      if (!ctx._authorization) {
        ctx._authorization = { cache: {} };
      }
      if (!ctx._authorization.cache[key]) {
        ctx._authorization.cache[key] = await this.ruleFunction(
          source,
          args,
          ctx,
          info
        );
      }
      const resolvedValue: boolean = ctx._authorization.cache[key];
      return resolvedValue;
    };
  }

  private hash(args: TArgs, source: TSource): string {
    return hashFunction({ args, source });
  }
}

export class And<TContext, TSource, TArgs> extends LogicRule<
  TContext,
  TSource,
  TArgs
> {
  public async resolve(
    source: TSource,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ): Promise<boolean> {
    const resolvedRules = await Promise.all(
      this.rules.map((rule) => rule.resolve(source, args, context, info))
    );
    return resolvedRules.every((value) => Boolean(value));
  }
}

export class Or<TContext, TSource, TArgs> extends LogicRule<
  TContext,
  TSource,
  TArgs
> {
  public async resolve(
    source: TSource,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ): Promise<boolean> {
    const resolvedRules = await Promise.all(
      this.rules.map((rule) => rule.resolve(source, args, context, info))
    );
    return resolvedRules.some((value) => Boolean(value));
  }
}

export class None<TContext, TSource, TArgs> extends LogicRule<
  TContext,
  TSource,
  TArgs
> {
  public async resolve(
    source: TSource,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ): Promise<boolean> {
    const resolvedRules = await Promise.all(
      this.rules.map((rule) => rule.resolve(source, args, context, info))
    );
    return resolvedRules.every((value) => !value);
  }
}
