import { DuplicateRuleError, RuleNotFoundError } from './../utils/errors';
import { Rule } from './rule';
import { Store } from './store';

describe('rule-store', () => {
  let r1: Rule<unknown, unknown, unknown>;
  let r2: Rule<unknown, unknown, unknown>;
  beforeEach(() => {
    Store.rules = {};
    r1 = new Rule('r1', 'none', async () => true);
    r2 = new Rule('r2', 'none', async () => true);
  });

  it('stores a rule', () => {
    Store.addRule(r1.name, r1);
    expect(Store.getRule(r1.name)).toBe(r1);
  });

  it('stores multiple rules', () => {
    Store.addRule(r1.name, r1);
    Store.addRule(r2.name, r2);
    expect(Store.getRule(r2.name)).toBe(r2);
    expect(Store.getRule(r1.name)).toBe(r1);
  });

  it('throws RuleNotFoundError when retrieving a wrong rule name', () => {
    expect(() => Store.getRule(r1.name)).toThrowError(RuleNotFoundError);
  });
});
