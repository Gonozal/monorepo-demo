import { GraphQLResolveInfo } from 'graphql';
import { Rule } from './rule';
import { rule, and, or, none } from './factories';

describe('rule-factories', () => {
  const resolveInfo = {} as GraphQLResolveInfo;

  describe('rule factory', () => {
    it('respects the user-provided name', () => {
      const r = rule({ name: 'My custom name' })(async () => true);
      expect(r.name).toEqual('My custom name');
    });

    it('generates a random name if none is provided', () => {
      const r = rule()(async () => true);
      expect(r.name.length).toBeGreaterThan(6); // implementation details might change from UUID
    });
  });

  describe('logic-rule factory', () => {
    let rules: Rule<unknown, unknown, unknown>[] = [];
    beforeEach(() => {
      rules = [
        rule()(async () => true),
        rule()(async () => false),
        rule()(async () => true),
      ];
    });

    it('creates and evaluates an "and" rule', () => {
      const r = and(...rules);
      expect(r.resolve(undefined, undefined, {}, resolveInfo)).resolves.toEqual(
        false
      );
    });

    it('creates and evaluates an "or" rule', () => {
      const r = or(...rules);
      expect(r.resolve(undefined, undefined, {}, resolveInfo)).resolves.toEqual(
        true
      );
    });

    it('creates and evaluates a "non" rule', () => {
      const r = none(...rules);
      expect(r.resolve(undefined, undefined, {}, resolveInfo)).resolves.toEqual(
        false
      );
    });
  });
});
