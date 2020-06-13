import {
  AuthenticationError,
  SchemaDirectiveVisitor,
} from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import {
  StorableRule,
  ExtendedGraphQLObjectType,
  ExtendedGraphqlField,
} from '../utils/types';
import { Store } from './store';

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: ExtendedGraphqlField<any, any>) {
    const ruleName = this.args.authorizationRule;
    const rule = Store.getRule(ruleName);
    this.authorizeField(field, rule);
  }

  visitObject(object: ExtendedGraphQLObjectType<any, any>) {
    if (object.authorizationRulesApplied) return;
    object.authorizationRulesApplied = true;
    const ruleName = this.args.authorizationRule;
    const rule = Store.getRule(ruleName);
    const fields = object.getFields();
    Object.keys(fields).forEach((fieldName) => {
      this.authorizeField(fields[fieldName], rule);
    });
  }

  private authorizeField(
    field: ExtendedGraphqlField<any, any>,
    rule: StorableRule
  ) {
    if (field.rules) {
      field.rules.push(rule);
    } else {
      field.rules = [rule];
    }
    // "Back up" the original resolve function. We need to call it later
    const originalResolve = field.resolve || defaultFieldResolver;
    field.resolve = async (source, args, context, info) => {
      const rules = field.rules;

      if (!rules) {
        return originalResolve.apply(this, [source, args, context, info]);
      }

      for (let i = 0; i < rules.length; i += 1) {
        const rule = rules[i];
        const isAuthorized = await rule.resolve(source, args, context, info);
        if (!isAuthorized) {
          throw new AuthenticationError(
            `Authorization failed for field ${field.name}`
          );
        }
      }

      return originalResolve.apply(this, [source, args, context, info]);
    };
  }
}
