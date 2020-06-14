import { Store } from './store';
import { Rule, And, Or, None } from './rule';
import { v4 as uuidV4 } from 'uuid';

import { RuleArgs, RuleFunction } from '../utils/types';

export const rule = <TSource = unknown, TArgs = unknown, TContext = unknown>(
  args?: RuleArgs
) => (
  func: RuleFunction<TContext, TSource, TArgs>
): Rule<TContext, TSource, TArgs> => {
  const id = args?.name || uuidV4();
  const cacheStrategy = args?.cacheStrategy || 'contextual';
  const rule = new Rule(id, cacheStrategy, func);
  Store.addRule(rule.name, rule as Rule<unknown, unknown, unknown>);
  return rule;
};

export const and = <TSource = unknown, TArgs = unknown, TContext = unknown>(
  ...rules: Rule<TContext, TSource, TArgs>[]
): And<TContext, TSource, TArgs> => {
  const id = uuidV4();
  const rule = new And<TContext, TSource, TArgs>(id, ...rules);
  Store.addRule(rule.name, rule);
  return rule;
};

export const or = <TSource = unknown, TArgs = unknown, TContext = unknown>(
  ...rules: Rule<TContext, TSource, TArgs>[]
): Or<TContext, TSource, TArgs> => {
  const id = uuidV4();
  const rule = new Or<TContext, TSource, TArgs>(id, ...rules);
  Store.addRule(rule.name, rule);
  return rule;
};

export const none = <TSource = unknown, TArgs = unknown, TContext = unknown>(
  ...rules: Rule<TContext, TSource, TArgs>[]
): None<TContext, TSource, TArgs> => {
  const id = uuidV4();
  const rule = new None<TContext, TSource, TArgs>(id, ...rules);
  Store.addRule(rule.name, rule);
  return rule;
};
