import { ScenarioCategoryUserGroupPermission } from './permissions/user-group/scenario-category-user-group-permission.entity';
import { ScenarioCategoryType } from './../../types/scenario-category';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { FilterableField } from '@nestjs-query/query-graphql';

import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { authenticated } from './../../app.authorization';
import { AppEntity } from '../../app.abstract.entity';
import { ScenarioCategoryUserPermission } from './permissions/user/scenario-category-user-permission.entity';

@Entity()
@ObjectType()
@Authorized(authenticated)
export class ScenarioCategory extends AppEntity {
  @FilterableField()
  @Column()
  public name!: string;

  @FilterableField()
  @Column({ default: true })
  public active!: boolean;

  @Column({ nullable: true })
  public description?: string;

  @Column()
  public order?: number;

  @FilterableField(() => ScenarioCategoryType)
  @Field(() => ScenarioCategoryType)
  @Column({ type: 'varchar' })
  public type!: ScenarioCategoryType;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  public parentId?: string;

  @HideField()
  @ManyToOne(
    () => ScenarioCategory,
    (scenarioCategory) => scenarioCategory.children
  )
  public parent?: ScenarioCategory;

  @HideField()
  @OneToMany(
    () => ScenarioCategory,
    (scenarioCategory) => scenarioCategory.parent
  )
  public children?: ScenarioCategory[];

  @HideField()
  @OneToMany(
    () => ScenarioCategoryUserPermission,
    (userPermission) => userPermission.scenarioCategory
  )
  public userPermissions?: ScenarioCategoryUserPermission[];

  @HideField()
  @OneToMany(
    () => ScenarioCategoryUserGroupPermission,
    (userGroupPermission) => userGroupPermission.scenarioCategory
  )
  public userGroupPermissions?: ScenarioCategoryUserGroupPermission[];

  // @HideField()
  // @OneToMany(
  //   () => ScenarioCategoryUserGroupPermission,
  //   (userGroupPermission) => userGroupPermission.scenarioCategory
  // )
  // public userGroupPermissions?: ScenarioCategoryUserGroupPermission[];
}
