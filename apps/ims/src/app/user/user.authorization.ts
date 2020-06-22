import { rule } from '@monorepo/graphql/authentication-directive';

import { Context } from './../../types/context';
import { UpdateUserInput } from './user.input';
import { User } from './user.entity';

export const allow = rule<
  User | undefined,
  UpdateUserInput | undefined,
  Context
>({ cacheStrategy: 'strict' })(async () => {
  return true;
});
