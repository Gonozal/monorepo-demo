import { StatusQueryService } from './status.service';
import { TaskTemplate } from './../task-template/task-template.entity';
import { Authorized } from '@monorepo/graphql/authentication-directive';

import { InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver, PagingStrategies } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

import { hasRole } from '../role/role.authorization';
import { authenticated } from './../../app.authorization';
import { Status } from './status.entity';
@Resolver(() => Status)
export class StatusResolver extends CRUDResolver(Status, {
  read: {
    many: {
      decorators: [Authorized(authenticated)],
    },
    one: {
      decorators: [Authorized(authenticated)],
    },
  },
  create: { decorators: [Authorized(authenticated)] },
  update: { decorators: [Authorized(authenticated)] },
  delete: { decorators: [Authorized(authenticated)] },
  relations: {
    many: {
      taskTemplates: {
        DTO: TaskTemplate,
        decorators: [Authorized(hasRole('admin.taskTemplates'))],
        pagingStrategy: PagingStrategies.NONE,
        disableRemove: true,
        disableUpdate: true,
      },
    },
    one: {},
  },
}) {
  constructor(
    @InjectQueryService(Status)
    readonly service: StatusQueryService
  ) {
    super(service);
  }
}
