import { rule } from '@monorepo/graphql/authentication-directive';

import { Context } from './../../common/context';
import { UpdateUserInput } from './user.input';
import { User } from './user.entity';

export const allow = rule<
  User | undefined,
  UpdateUserInput | undefined,
  Context
>({ cacheStrategy: 'strict' })(async (source, args, context, info) => {
  return true;
});
