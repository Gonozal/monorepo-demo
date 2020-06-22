import { rule } from '@monorepo/graphql/authentication-directive';

import { Context } from './../../types/context';
import { UserGroup } from './user-group.entity';

export const allow = rule<UserGroup | undefined, undefined, Context>({
  cacheStrategy: 'none',
})(async () => {
  return true;
});
