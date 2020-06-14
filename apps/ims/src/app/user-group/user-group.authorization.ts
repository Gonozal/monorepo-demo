import { rule } from '@monorepo/graphql/authentication-directive';

import { Context } from './../../common/context';
import { UpdateUserGroupInput } from './user-group.input';
import { UserGroup } from './user-group.entity';

export const allow = rule<
  UserGroup | undefined,
  UpdateUserGroupInput | undefined,
  Context
>({ cacheStrategy: 'none' })(async (source, args, context, info) => {
  return true;
});
