import { RuleStore } from './rule-store';
import { Rule, And, Or, None } from './rule';
import { v4 as uuidV4 } from 'uuid';

import { RuleArgs, RuleFunction } from './types';

export const rule = <TContext = any, TSource = any, TArgs = any>(
  args?: RuleArgs
) => (
  func: RuleFunction<TContext, TSource, TArgs>
): Rule<TContext, TSource, TArgs> => {
  const id = args?.name || uuidV4();
  const cacheStrategy = args?.cacheStrategy || 'contextual';
  const rule = new Rule(id, cacheStrategy, func);
  RuleStore.rules[id] = rule;
  return rule;
};

export const and = <TContext = any, TSource = any, TArgs = any>(
  ...rules: Rule<TContext, TSource, TArgs>[]
): And<TContext, TSource, TArgs> => {
  const id = uuidV4();
  const rule = new And<TContext, TSource, TArgs>(id, ...rules);
  RuleStore.rules[id] = rule;
  return rule;
};

export const or = <TContext = any, TSource = any, TArgs = any>(
  ...rules: Rule<TContext, TSource, TArgs>[]
): Or<TContext, TSource, TArgs> => {
  const id = uuidV4();
  const rule = new Or<TContext, TSource, TArgs>(id, ...rules);
  RuleStore.rules[id] = rule;
  return rule;
};

export const none = <TContext = any, TSource = any, TArgs = any>(
  ...rules: Rule<TContext, TSource, TArgs>[]
): None<TContext, TSource, TArgs> => {
  const id = uuidV4();
  const rule = new None<TContext, TSource, TArgs>(id, ...rules);
  RuleStore.rules[id] = rule;
  return rule;
};
