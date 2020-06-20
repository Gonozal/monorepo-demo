import { Context } from './types/context';
import { rule } from '@monorepo/graphql/authentication-directive';

export const authenticated = rule<unknown, unknown, Context>({
  cacheStrategy: 'contextual',
})(async (parent, args, context) => {
  return Boolean(context.user);
});

export const allow = rule<unknown, unknown, Context>({
  cacheStrategy: 'contextual',
})(async () => {
  return true;
});

export const deny = rule<unknown, unknown, Context>({
  cacheStrategy: 'contextual',
})(async () => {
  return false;
});
