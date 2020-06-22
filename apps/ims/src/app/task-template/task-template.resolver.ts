import { Authorized } from '@monorepo/graphql/authentication-directive';

import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver, PagingStrategies } from '@nestjs-query/query-graphql';
import { Resolver, Mutation } from '@nestjs/graphql';

import { hasRole } from '../role/role.authorization';
import { authenticated } from './../../app.authorization';
import { TaskTemplate } from './task-template.entity';
@Resolver()
export class TaskTemplateResolver extends CRUDResolver(TaskTemplate, {
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
  // Uncomment to define relation field-resolvers
  /*
    relations: {
      many: { },
      one: {},
    },
  */
}) {
  constructor(
    @InjectQueryService(TaskTemplate)
    readonly service: QueryService<TaskTemplate>
  ) {
    super(service);
  }
}
