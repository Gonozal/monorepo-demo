import { Rule, LogicRule } from '../lib/rule';
import { GraphQLResolveInfo, GraphQLField, GraphQLObjectType } from 'graphql';
export type preResolveRule = () => () => boolean;

export type RuleFunction<TContext, TSource, TArgs> = (
  source: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<boolean>;

export type CacheStrategy = 'none' | 'contextual' | 'strict';

export interface RuleArgs {
  name?: string;
  cacheStrategy?: CacheStrategy;
}

export type StorableRule =
  | Rule<unknown, unknown, unknown>
  | LogicRule<unknown, unknown, unknown>;

export interface RuleStoreRules {
  [key: string]: StorableRule;
}

export interface ExtendedGraphqlField<
  TSource,
  TContext,
  TArgs = { [key: string]: unknown }
> extends GraphQLField<TSource, TContext, TArgs> {
  rules?: StorableRule[];
}

export interface ExtendedGraphQLObjectType<
  TSource,
  TContext,
  TArgs = { [key: string]: unknown }
> extends GraphQLObjectType<TSource, TContext, TArgs> {
  authorizationRulesApplied?: boolean;
}

export interface DecoratorContext {
  _authorization?: {
    cache?: Record<string, boolean>;
  };
}
