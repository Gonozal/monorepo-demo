import { rule } from '@monorepo/graphql/authentication-directive';

import { Context } from './../../types/context';

import { TaskTemplate } from './task-template.entity';

export const allow = rule<TaskTemplate | undefined, undefined, Context>({
  cacheStrategy: 'strict',
})(async (source, args, context, info) => {
  console.log(info);
  return true;
});
