import { Directive } from '@nestjs/graphql';
import { applyDecorators } from '@nestjs/common';

import { LogicRule, Rule } from './rule';

export function Authorized<
  TContext = unknown,
  TSource = unknown,
  TArgs = unknown
>(
  rule: Rule<TContext, TSource, TArgs> | LogicRule<TContext, TSource, TArgs>
): <TFunction extends () => void, Y>(
  target: any,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>
) => void {
  return applyDecorators(
    Directive(`@Authorized(authorizationRule: "${rule.name}")`)
  );
}
