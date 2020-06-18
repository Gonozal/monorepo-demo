import { Context } from './types/context';
import { rule } from '@monorepo/graphql/authentication-directive';

export const authenticated = rule<unknown, unknown, Context>({
  cacheStrategy: 'contextual',
})(async (parent, args, context, info) => {
  return Boolean(context.user);
});
