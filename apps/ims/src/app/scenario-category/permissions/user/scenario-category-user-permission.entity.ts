import { FilterableField } from '@nestjs-query/query-graphql';
import { ScenarioCategory } from './../../scenario-category.entity';
import { ScenarioPermissionType } from './../../../../types/scenario-permission';
import { User } from './../../../user/user.entity';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { Field, ID, ObjectType, HideField } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { authenticated } from '../../../../app.authorization';

@Entity()
@ObjectType()
@Authorized(authenticated)
export class ScenarioCategoryUserPermission {
  @Field(() => ID)
  @PrimaryColumn()
  scenarioCategoryId!: string;

  @FilterableField(() => ScenarioPermissionType)
  @PrimaryColumn({ type: 'varchar' })
  public assignmentType!: ScenarioPermissionType;

  @Field(() => ID)
  @PrimaryColumn()
  public userId!: string;

  @HideField()
  @ManyToOne(() => User, (user) => user.scenarioCategoryPermissions)
  public user?: User;

  @HideField()
  @ManyToOne(
    () => ScenarioCategory,
    (scenarioCategory) => scenarioCategory.userPermissions
  )
  public scenarioCategory?: ScenarioCategory;
}
