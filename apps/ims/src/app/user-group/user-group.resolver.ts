import { UserGroupQueryService } from './user-group.service';
import { getRepository } from 'typeorm';
import { TaskTemplate } from './../task-template/task-template.entity';
import {
  CreateOneUserGroupInput,
  CreateManyUserGroupInput,
  UpdateOneUserGroupInput,
  UpdateManyUserGroupInput,
} from './user-group.input';
import { UserGroupRole } from './user-group-role/user-group-role.entity';
import { User } from './../user/user.entity';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { hasRole } from '../role/role.authorization';
import { authenticated } from './../../app.authorization';
import { UserGroup } from './user-group.entity';

import { InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver, PagingStrategies } from '@nestjs-query/query-graphql';
import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';

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
  create: {
    decorators: [Authorized(hasRole('admin.userGroups.create'))],
    CreateOneInput: CreateOneUserGroupInput,
    CreateManyInput: CreateManyUserGroupInput,
  },
  update: {
    decorators: [Authorized(hasRole('admin.userGroups.edit'))],
    UpdateOneInput: UpdateOneUserGroupInput,
    UpdateManyInput: UpdateManyUserGroupInput,
  },
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
      taskTemplates: {
        DTO: TaskTemplate,
        decorators: [Authorized(hasRole('admin.taskTemplates'))],
        pagingStrategy: PagingStrategies.NONE,
        disableRemove: true,
        disableUpdate: true,
      },
    },
  },
}) {
  constructor(
    @InjectQueryService(UserGroup)
    service: UserGroupQueryService
  ) {
    super(service);
  }
  @Authorized(hasRole('admin.userGroups.toggleActive'))
  @Mutation(() => UserGroup)
  async setStatusOnUserGroup(
    @Args('id', { type: () => ID }) id: string,
    @Args('active') active: boolean
  ): Promise<UserGroup> {
    const userGroupRepository = getRepository(UserGroup);
    await userGroupRepository.update({ id }, { active });
    return userGroupRepository.findOneOrFail(id);
  }
}
