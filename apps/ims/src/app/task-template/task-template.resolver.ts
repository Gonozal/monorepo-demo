import { User } from './../user/user.entity';
import { Status } from './../status/status.entity';
import { Authorized } from '@monorepo/graphql/authentication-directive';

import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver, PagingStrategies } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

import { hasRole } from '../role/role.authorization';
import { authenticated } from './../../app.authorization';
import { TaskTemplate } from './task-template.entity';
import { UserGroup } from '../user-group/user-group.entity';
@Resolver()
export class TaskTemplateResolver extends CRUDResolver(TaskTemplate, {
  read: {
    many: {
      decorators: [Authorized(hasRole('admin.taskTemplates'))],
    },
    one: {
      decorators: [Authorized(authenticated)],
    },
  },
  create: { decorators: [Authorized(hasRole('admin.taskTemplates.create'))] },
  update: { decorators: [Authorized(hasRole('admin.taskTemplates.edit'))] },
  delete: { decorators: [Authorized(hasRole('admin.taskTemplates.delete'))] },
  relations: {
    many: {
      users: {
        DTO: User,
        decorators: [Authorized(hasRole('admin.taskTemplates'))],
        disableRemove: true,
        disableUpdate: true,
        pagingStrategy: PagingStrategies.NONE,
      },
      userGroups: {
        DTO: UserGroup,
        decorators: [Authorized(hasRole('admin.taskTemplates'))],
        disableRemove: true,
        disableUpdate: true,
        pagingStrategy: PagingStrategies.NONE,
      },
    },
    one: {
      status: {
        DTO: Status,
        decorators: [Authorized(hasRole('admin.taskTemplates'))],
        disableRemove: true,
      },
    },
  },
}) {
  constructor(
    @InjectQueryService(TaskTemplate)
    readonly service: QueryService<TaskTemplate>
  ) {
    super(service);
  }

  // TODO: CreateWithRelation
  // TODO: SetUsers
  // TODO: SetUserGroups
}
