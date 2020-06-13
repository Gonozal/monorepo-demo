import { GraphQLResolveInfo } from 'graphql';
import { Rule, And, Or, None } from './rule';

describe('rule', () => {
  let context: Record<string, unknown>;
  const resolveInfo = {} as GraphQLResolveInfo;

  beforeEach(() => {
    context = {};
  });

  describe('uncached identity', () => {
    it('evaluates correctly to true', () => {
      const rule = new Rule('identity', 'none', async () => true);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(true);
    });

    it('evaluates correctly to false', () => {
      const rule = new Rule('identity', 'none', async () => false);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(false);
    });
  });

  describe('context-cached identity', () => {
    it('evaluates correctly to true', () => {
      const rule = new Rule('identity', 'contextual', async () => true);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(true);
    });

    it('evaluates correctly to false', () => {
      const rule = new Rule('identity', 'contextual', async () => false);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(false);
    });
  });

  describe('strictly-cached identity', () => {
    it('evaluates correctly to true', () => {
      const rule = new Rule('identity', 'strict', async () => {
        return true;
      });
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(true);
    });

    it('evaluates correctly to false', () => {
      const rule = new Rule('identity', 'strict', async () => {
        return false;
      });
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(false);
    });
  });

  describe('logic "and"-rule', () => {
    it('evaluates all-true rules correctly', () => {
      const rules = [
        new Rule('identity1', 'none', async () => true),
        new Rule('identity2', 'none', async () => true),
        new Rule('identity3', 'none', async () => true),
      ];
      const rule = new And('and', ...rules);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(true);
    });

    it('evaluates all-false rules correctly', () => {
      const rules = [
        new Rule('identity1', 'none', async () => false),
        new Rule('identity2', 'none', async () => false),
        new Rule('identity3', 'none', async () => false),
      ];
      const rule = new And('and', ...rules);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(false);
    });

    it('evaluates mixed rules correctly', () => {
      const rules = [
        new Rule('identity1', 'none', async () => true),
        new Rule('identity2', 'none', async () => false),
        new Rule('identity3', 'none', async () => true),
      ];
      const rule = new And('and', ...rules);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(false);
    });
  });

  describe('logic "or"-rule', () => {
    it('evaluates all-true rules correctly', () => {
      const rules = [
        new Rule('identity1', 'none', async () => true),
        new Rule('identity2', 'none', async () => true),
        new Rule('identity3', 'none', async () => true),
      ];
      const rule = new Or('and', ...rules);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(true);
    });

    it('evaluates all-false rules correctly', () => {
      const rules = [
        new Rule('identity1', 'none', async () => false),
        new Rule('identity2', 'none', async () => false),
        new Rule('identity3', 'none', async () => false),
      ];
      const rule = new Or('and', ...rules);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(false);
    });

    it('evaluates mixed rules correctly', () => {
      const rules = [
        new Rule('identity1', 'none', async () => true),
        new Rule('identity2', 'none', async () => false),
        new Rule('identity3', 'none', async () => true),
      ];
      const rule = new Or('and', ...rules);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(true);
    });
  });

  describe('logic "none"-rule', () => {
    it('evaluates all-true rules correctly', () => {
      const rules = [
        new Rule('identity1', 'none', async () => true),
        new Rule('identity2', 'none', async () => true),
        new Rule('identity3', 'none', async () => true),
      ];
      const rule = new None('and', ...rules);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(false);
    });

    it('evaluates all-false rules correctly', () => {
      const rules = [
        new Rule('identity1', 'none', async () => false),
        new Rule('identity2', 'none', async () => false),
        new Rule('identity3', 'none', async () => false),
      ];
      const rule = new None('and', ...rules);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(true);
    });

    it('evaluates mixed rules correctly', () => {
      const rules = [
        new Rule('identity1', 'none', async () => true),
        new Rule('identity2', 'none', async () => false),
        new Rule('identity3', 'none', async () => true),
      ];
      const rule = new None('and', ...rules);
      expect(
        rule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(false);
    });
  });

  describe('mixed logic-rule', () => {
    it('evaluates nested logic rules correctly', () => {
      const rules = [
        new Rule('identity1', 'none', async () => true),
        new Rule('identity2', 'none', async () => false),
        new Rule('identity3', 'none', async () => true),
      ];
      const orRule1 = new Or('or1', ...rules);
      const orRule2 = new Or('or2', ...rules);
      const andRule = new And('and', orRule1, orRule2);
      const noneRule = new None('none', andRule);
      expect(
        noneRule.resolve(undefined, undefined, context, resolveInfo)
      ).resolves.toEqual(false);
    });
  });

  describe('with context-level caching', () => {
    it('executes the rule only once', async () => {
      const context = {};
      let counter = 0;
      const rule = new Rule('identity', 'contextual', async () => {
        counter += 1;
        return true;
      });
      await rule.resolve(undefined, undefined, context, resolveInfo);
      await rule.resolve(undefined, undefined, context, resolveInfo);
      await rule.resolve(undefined, undefined, context, resolveInfo);
      expect(counter).toEqual(1);
    });
  });

  describe('with strict caching', () => {
    it("executes the rule only once if dependencies don't change", async () => {
      const context = {};
      let counter = 0;
      const rule = new Rule('identity', 'strict', async () => {
        counter += 1;
        return true;
      });
      await rule.resolve(undefined, undefined, context, resolveInfo);
      await rule.resolve(undefined, undefined, context, resolveInfo);
      await rule.resolve(undefined, undefined, context, resolveInfo);
      expect(counter).toEqual(1);
    });

    it('executes the rule when dependencies change', async () => {
      const context = {};
      let counter = 0;
      const rule = new Rule('identity', 'strict', async () => {
        counter += 1;
        return true;
      });
      const user1 = { id: 1 };
      const user2 = { id: 2 };
      await rule.resolve(user1, undefined, context, resolveInfo);
      await rule.resolve(user2, undefined, context, resolveInfo);
      await rule.resolve(user1, undefined, context, resolveInfo);
      expect(counter).toEqual(2);
    });
  });
});
