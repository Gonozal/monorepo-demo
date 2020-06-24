import { UserGroup } from './../../../user-group/user-group.entity';
import { ScenarioCategory } from './../../scenario-category.entity';
import { Authorized } from '@monorepo/graphql/authentication-directive';

import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

import { hasRole } from '../../../role/role.authorization';
import { ScenarioCategoryUserGroupPermission } from './scenario-category-user-group-permission.entity';
@Resolver(() => ScenarioCategoryUserGroupPermission)
export class ScenarioCategoryUserGroupPermissionResolver extends CRUDResolver(
  ScenarioCategoryUserGroupPermission,
  {
    read: { disabled: true },
    create: { disabled: true },
    delete: { disabled: true },
    update: { disabled: true },

    relations: {
      one: {
        userGroup: {
          DTO: UserGroup,
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
    @InjectQueryService(ScenarioCategoryUserGroupPermission)
    readonly service: QueryService<ScenarioCategoryUserGroupPermission>
  ) {
    super(service);
  }
}
