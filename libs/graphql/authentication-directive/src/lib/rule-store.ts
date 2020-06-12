import { RuleStoreRules, StorableRule } from './types';
import { RuleNotFoundError, DuplicateRuleError } from './errors';

export class RuleStore {
  static rules: RuleStoreRules = {};

  static getRule(id: string) {
    const rule = this.rules[id];
    if (!rule) throw new RuleNotFoundError(id);

    return rule;
  }

  static addRule(id: string, rule: StorableRule) {
    if (this.rules[id]) {
      throw new DuplicateRuleError(id);
    }
    this.rules[id] = rule;
    return rule;
  }
}
