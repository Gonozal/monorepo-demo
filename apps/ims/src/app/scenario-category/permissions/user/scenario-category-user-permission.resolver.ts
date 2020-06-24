import { ScenarioCategory } from './../../scenario-category.entity';
import { User } from './../../../user/user.entity';
import { Authorized } from '@monorepo/graphql/authentication-directive';

import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

import { hasRole } from '../../../role/role.authorization';
import { ScenarioCategoryUserPermission } from './scenario-category-user-permission.entity';
@Resolver(() => ScenarioCategoryUserPermission)
export class ScenarioCategoryUserPermissionResolver extends CRUDResolver(
  ScenarioCategoryUserPermission,
  {
    read: { disabled: true },
    create: { disabled: true },
    delete: { disabled: true },
    update: { disabled: true },

    relations: {
      one: {
        user: {
          DTO: User,
          disableRemove: true,
          disableUpdate: true,
          decorators: [Authorized(hasRole('admin.scenarioCategories'))],
        },
        scenarioCategory: {
          DTO: ScenarioCategory,
          disableRemove: true,
          disableUpdate: true,
          decorators: [Authorized(hasRole('admin.scenarioCategories'))],
        },
      },
    },
  }
) {
  constructor(
    @InjectQueryService(ScenarioCategoryUserPermission)
    readonly service: QueryService<ScenarioCategoryUserPermission>
  ) {
    super(service);
  }
}
