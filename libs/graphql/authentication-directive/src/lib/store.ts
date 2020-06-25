import { Rule } from './rule';
import { RuleStoreRules, StorableRule } from '../utils/types';
import { RuleNotFoundError } from '../utils/errors';

export class Store {
  static rules: RuleStoreRules = {};

  static getRule<TSource, TArgs, TContext>(
    id: string
  ): Rule<TSource, TArgs, TContext> {
    const rule = this.rules[id] as Rule<TSource, TArgs, TContext>;
    if (!rule) throw new RuleNotFoundError(id);

    return rule;
  }

  static addRule(id: string, rule: StorableRule): void {
    this.rules[id] = rule;
  }
}
