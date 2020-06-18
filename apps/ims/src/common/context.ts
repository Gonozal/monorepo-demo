import { Context } from './../types/context';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { User } from '../app/user/user.entity';

export const gqlContext = async ({ req }: { req: any }): Promise<Context> => {
  const context: Context = {};
  const userRepository = getRepository(User);

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
    (await userRepository.findOne({
      where: { id: userId },
      relations: ['userGroup', 'disabledRoles', 'userGroup.userGroupRoles'],
    }));
  if (!user) return context;
  user.roles = [];
  context.user = user as Context['user'];

  console.log(context);
  return context;
};
