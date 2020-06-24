import { UserQueryService } from './user.service';
import {
  CreateOneUserInput,
  CreateManyUserInput,
  UpdateOneUserInput,
  UpdateManyUserInput,
} from './user.input';
import { TaskTemplate } from './../task-template/task-template.entity';
import { UserGroup } from './../user-group/user-group.entity';
import { RoleId } from './../../types/roles';
import { JoinTableRelationInput } from './../../app.input';
import { UserRole } from './user-role/user-role.entity';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { hasRole } from '../role/role.authorization';
import { authenticated } from './../../app.authorization';
import { User } from './user.entity';

import { InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver, PagingStrategies } from '@nestjs-query/query-graphql';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { getRepository } from 'typeorm';
import { ScenarioCategoryUserPermission } from '../scenario-category/permissions/user/scenario-category-user-permission.entity';

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
  create: {
    decorators: [Authorized(hasRole('users.users.create'))],
    CreateOneInput: CreateOneUserInput,
    CreateManyInput: CreateManyUserInput,
  },
  update: {
    decorators: [Authorized(hasRole('users.users.edit'))],
    UpdateOneInput: UpdateOneUserInput,
    UpdateManyInput: UpdateManyUserInput,
  },
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
      taskTemplates: {
        DTO: TaskTemplate,
        decorators: [Authorized(hasRole('admin.taskTemplates'))],
        disableRemove: true,
        disableUpdate: true,
      },
      scenarioCategoryPermissions: {
        DTO: ScenarioCategoryUserPermission,
        decorators: [Authorized(hasRole('admin.scenarioCategories'))],
        pagingStrategy: PagingStrategies.NONE,
        disableRemove: true,
        disableUpdate: true,
      },
    },
    one: {
      userGroup: {
        DTO: UserGroup,
        decorators: [Authorized(hasRole('users.users'))],
      },
    },
  },
}) {
  constructor(
    @InjectQueryService(User)
    readonly service: UserQueryService
  ) {
    super(service);
  }

  @Mutation(() => User)
  async setUserRolesOnUser(
    @Args('input') input: JoinTableRelationInput
  ): Promise<User> {
    const repository = getRepository(UserRole);
    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(input.id);
    await repository.delete({ userId: input.id });
    await repository.insert(
      input.relationIds.map((roleId) => {
        return { roleId: roleId as RoleId, userId: input.id };
      })
    );
    return user;
  }
}
