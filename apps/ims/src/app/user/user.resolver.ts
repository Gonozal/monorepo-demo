import { UserGroup } from './../user-group/user-group.entity';
import { RoleId } from './../../types/roles';
import { JoinTableRelationInput } from './../../app.input';
import { UserRole } from './user-role/user-role.entity';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { hasRole } from '../role/role.authorization';
import { authenticated } from './../../app.authorization';
import { User } from './user.entity';

import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver, PagingStrategies } from '@nestjs-query/query-graphql';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

@Resolver(() => User)
export class UserResolver extends CRUDResolver(User, {
  read: {
    many: {
      decorators: [Authorized(hasRole('users.users.index'))],
    },
    one: {
      decorators: [Authorized(authenticated)],
    },
  },
  create: { decorators: [Authorized(hasRole('users.users.create'))] },
  update: { decorators: [Authorized(hasRole('users.users.edit'))] },
  delete: { decorators: [Authorized(hasRole('users.users.delete'))] },
  relations: {
    many: {
      userRoles: {
        DTO: UserRole,
        decorators: [Authorized(hasRole('users.users.edit'))],
        pagingStrategy: PagingStrategies.NONE,
        disableRemove: true,
        disableUpdate: true,
      },
    },
    one: {
      userGroup: { DTO: UserGroup },
    },
  },
}) {
  constructor(
    @InjectQueryService(User)
    readonly service: QueryService<User>
  ) {
    super(service);
  }

  @Mutation(() => UserGroup)
  async setUserRoles(
    @Args('input') input: JoinTableRelationInput
  ): Promise<UserGroup> {
    const repository = getRepository(UserRole);
    const userRepository = getRepository(UserGroup);
    await repository.delete({ userId: input.id });
    const roles = input.relationIds.map((id) => {
      const role = new UserRole();
      role.roleId = id as RoleId;
      role.userId = input.id;
      return role;
    });
    await repository.save(roles);

    return userRepository.findOneOrFail(input.id);
  }
}
