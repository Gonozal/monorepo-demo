import { CreateUserGroupWithRelations } from './user-group.input';
import { RoleId } from './../../types/roles';
import { UserGroupRole } from './user-group-role/user-group-role.entity';
import { User } from './../user/user.entity';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { hasRole } from '../role/role.authorization';
import { authenticated } from './../../app.authorization';
import { UserGroup } from './user-group.entity';

import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver, PagingStrategies } from '@nestjs-query/query-graphql';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { getConnection } from 'typeorm';

@Resolver(() => UserGroup)
export class UserGroupResolver extends CRUDResolver(UserGroup, {
  read: {
    one: {
      decorators: [Authorized(authenticated)],
    },
    many: {
      decorators: [Authorized(hasRole('admin.userGroups'))],
    },
  },
  create: { decorators: [Authorized(hasRole('admin.userGroups.create'))] },
  update: { decorators: [Authorized(hasRole('admin.userGroups.edit'))] },
  delete: { decorators: [Authorized(hasRole('admin.userGroups.delete'))] },
  relations: {
    many: {
      users: {
        DTO: User,
        decorators: [Authorized(hasRole('users.users.index'))],
      },
      userGroupRoles: {
        DTO: UserGroupRole,
        decorators: [Authorized(hasRole('admin.userGroups'))],
        pagingStrategy: PagingStrategies.NONE,
        disableRemove: true,
        disableUpdate: true,
      },
    },
  },
}) {
  constructor(
    @InjectQueryService(UserGroup)
    readonly service: QueryService<UserGroup>
  ) {
    super(service);
  }

  @Mutation(() => UserGroup)
  async createOneUserGroupWithRelation(
    @Args('input') input: CreateUserGroupWithRelations
  ): Promise<UserGroup> {
    // Wrap everything in a transaction
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      // save user-group first (we need the generated ID)
      const userGroup = await queryRunner.manager.save(UserGroup, {
        ...input,
        roles: undefined,
        id: UserGroup.generateId(),
      }); // fix auto-generated types

      // insert roles second
      await queryRunner.manager.insert(
        UserGroupRole,
        UserGroupRole.fromRoleIds(input.roles as RoleId[], userGroup.id)
      );
      // commit transaction if everything went well
      await queryRunner.commitTransaction();
      return queryRunner.manager.findOneOrFail(UserGroup, userGroup.id);
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
