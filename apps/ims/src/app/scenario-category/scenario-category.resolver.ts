import { ScenarioCategoryQueryService } from './scenario-category.service';
import { Authorized } from '@monorepo/graphql/authentication-directive';

import { InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver, PagingStrategies } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

import { hasRole } from '../role/role.authorization';
import { authenticated } from './../../app.authorization';
import { ScenarioCategory } from './scenario-category.entity';
import { ScenarioCategoryUserPermission } from './permissions/user/scenario-category-user-permission.entity';
@Resolver(() => ScenarioCategory)
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
  relations: {
    many: {
      userPermissions: {
        DTO: ScenarioCategoryUserPermission,
        decorators: [Authorized(hasRole('admin.scenarioCategories'))],
        pagingStrategy: PagingStrategies.NONE,
        disableRemove: true,
        disableUpdate: true,
      },
    },
    one: {},
  },
}) {
  constructor(
    @InjectQueryService(ScenarioCategory)
    readonly service: ScenarioCategoryQueryService
  ) {
    super(service);
  }
}
