import { Directive } from '@nestjs/graphql';
import { applyDecorators } from '@nestjs/common';

import { LogicRule, Rule } from './rule';

export function Authorized<TContext = any, TSource = any, TArgs = any>(
  rule: Rule<TContext, TSource, TArgs> | LogicRule<TContext, TSource, TArgs>
) {
  return applyDecorators(
    Directive(`@Authorized(authorizationRule: "${rule.name}")`)
  );
}
