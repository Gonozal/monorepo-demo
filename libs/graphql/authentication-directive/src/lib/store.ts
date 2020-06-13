import { RuleStoreRules, StorableRule } from '../utils/types';
import { RuleNotFoundError, DuplicateRuleError } from '../utils/errors';

export class Store {
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
