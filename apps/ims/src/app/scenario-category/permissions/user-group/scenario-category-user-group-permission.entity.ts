import { ScenarioCategoryUserGroupInput } from './../../scenario-category.input';
import { UserGroup } from './../../../user-group/user-group.entity';
import { FilterableField } from '@nestjs-query/query-graphql';
import { ScenarioCategory } from './../../scenario-category.entity';
import { ScenarioPermissionType } from './../../../../types/scenario-permission';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { Field, ID, ObjectType, HideField } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { authenticated } from '../../../../app.authorization';

@Entity()
@ObjectType()
@Authorized(authenticated)
export class ScenarioCategoryUserGroupPermission {
  @Field(() => ID)
  @PrimaryColumn()
  scenarioCategoryId!: string;

  @FilterableField(() => ScenarioPermissionType)
  @PrimaryColumn({ type: 'varchar' })
  public assignmentType!: ScenarioPermissionType;

  @Field(() => ID)
  @PrimaryColumn()
  public userGroupId!: string;

  @HideField()
  @ManyToOne(
    () => UserGroup,
    (userGroup) => userGroup.scenarioCategoryPermissions
  )
  public userGroup?: UserGroup;

  @HideField()
  @ManyToOne(
    () => ScenarioCategory,
    (scenarioCategory) => scenarioCategory.userPermissions
  )
  public scenarioCategory?: ScenarioCategory;

  public static fromInput(
    permissions: ScenarioCategoryUserGroupInput[] | undefined,
    scenarioCategoryId: string
  ): ScenarioCategoryUserGroupPermission[] {
    if (!permissions) return [];

    return permissions.map((permission) => {
      return {
        ...permission,
        scenarioCategoryId,
      };
    });
  }
}
