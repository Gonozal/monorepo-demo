import { DecoratorContext } from './../utils/types';
import { CacheStrategy, RuleFunction } from '../utils/types';
import { GraphQLResolveInfo } from 'graphql';
import * as hashFunction from 'object-hash';

abstract class Resolvable<TSource, TArgs, TContext> {
  abstract async resolve(
    source: TSource,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ): Promise<boolean>;
}

export abstract class LogicRule<TSource, TArgs, TContext> extends Resolvable<
  TSource,
  TArgs,
  TContext
> {
  protected rules: Resolvable<TSource, TArgs, TContext>[];

  constructor(
    public name: string,
    ...rules: Resolvable<TSource, TArgs, TContext>[]
  ) {
    super();
    this.rules = rules;
  }
}

export class Rule<TSource, TArgs, TContext> extends Resolvable<
  TSource,
  TArgs,
  TContext
> {
  public constructor(
    public name: string,
    public cacheStrategy: CacheStrategy,
    public ruleFunction: RuleFunction<TSource, TArgs, TContext>
  ) {
    super();
  }

  public async resolve(
    source: TSource,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
  ): Promise<boolean> {
    try {
      switch (this.cacheStrategy) {
        case 'none':
          return this.ruleFunction(source, args, context, info);
        case 'contextual':
          return this.resolveFromCache(this.name)(source, args, context, info);
        case 'strict':
          return this.resolveFromCache(
            `${this.name}-${this.hash(args, source)}`
          )(source, args, context, info);
      }
    } catch (error) {
      return false;
    }
  }

  private resolveFromCache(
    key: string
  ): (
    source: TSource,
    args: TArgs,
    context: DecoratorContext,
    info: GraphQLResolveInfo
  ) => Promise<boolean> {
    return async (source, args, context, info) => {
      if (context._authorization === undefined) {
        context._authorization = { cache: {} };
      }
      const cache = context._authorization.cache;
      if (cache === undefined) {
        throw new Error('Cache undefined on context object'); // this SHOULD never happen
      }
      if (cache[key] === undefined) {
        const value = await this.ruleFunction(
          source,
          args,
          context as TContext,
          info
        );
        cache[key] = value;
      }
      const resolvedValue: boolean = cache[key];
      return resolvedValue;
    };
  }

  private hash(args: TArgs, source: TSource): string {
    return hashFunction({ args, source });
  }
}

export class And<TSource, TArgs, TContext> extends LogicRule<
  TSource,
  TArgs,
  TContext
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

export class Or<TSource, TArgs, TContext> extends LogicRule<
  TSource,
  TArgs,
  TContext
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

export class None<TSource, TArgs, TContext> extends LogicRule<
  TSource,
  TArgs,
  TContext
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
