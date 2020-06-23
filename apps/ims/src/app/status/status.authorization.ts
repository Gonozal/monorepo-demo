import { rule } from '@monorepo/graphql/authentication-directive';

import { Context } from './../../types/context';

import { Status } from './status.entity';

export const allow = rule<
  Status | undefined,
  undefined,
  Context
>({ cacheStrategy: 'strict' })(async (source, args, context, info) => {
  console.log(info);
  return true;
});
