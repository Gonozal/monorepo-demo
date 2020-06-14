import * as jwt from 'jsonwebtoken';

import { User } from '../app/user/user.entity';
import { getDataLoader } from '@monorepo/graphql/dataloader';

export interface Context {
  [key: string]: any;
  user?: User;
}

export const gqlContext = async (params: any) => {
  const context: Context = {};
  const req = params.req;
  const userLoader = getDataLoader(context, User);

  let userId: string | undefined = undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1];
    const { sub } = jwt.verify(token, process.env.JWT_SECRET as string, {
      algorithms: ['HS256'],
    }) as { sub: string };
    userId = sub;
  }

  const user =
    userId &&
    (await userLoader.load({
      where: { id: userId },
    }));
  if (!user || !user[0]) return context;
  context.user = user[0];

  return context;
};
