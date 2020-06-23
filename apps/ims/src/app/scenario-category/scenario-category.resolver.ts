import { Authorized } from '@monorepo/graphql/authentication-directive';

import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

import { hasRole } from '../role/role.authorization';
import { authenticated } from './../../app.authorization';
import { ScenarioCategory } from './scenario-category.entity';
@Resolver()
export class ScenarioCategoryResolver extends CRUDResolver(ScenarioCategory, {
  read: {
    many: {
      decorators: [Authorized(hasRole('admin.scenarioCategories'))],
    },
    one: {
      decorators: [Authorized(authenticated)],
    },
  },
  create: {
    decorators: [Authorized(hasRole('admin.scenarioCategories.create'))],
  },
  update: {
    decorators: [Authorized(hasRole('admin.scenarioCategories.edit'))],
  },
  delete: {
    decorators: [Authorized(hasRole('admin.scenarioCategories.edit'))],
  },
  // Uncomment to define relation field-resolvers
  /*
    relations: {
      many: { },
      one: {},
    },
  */
}) {
  constructor(
    @InjectQueryService(ScenarioCategory)
    readonly service: QueryService<ScenarioCategory>
  ) {
    super(service);
  }
}
