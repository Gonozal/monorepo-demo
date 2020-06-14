import { Context } from './common/context';
import { rule } from '@monorepo/graphql/authentication-directive';

export const authenticated = rule<unknown, unknown, Context>({
  cacheStrategy: 'contextual',
})(async (parent, args, context) => {
  return Boolean(context.user);
});
