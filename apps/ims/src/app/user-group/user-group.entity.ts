import { ScenarioCategoryUserGroupPermission } from './../scenario-category/permissions/user-group/scenario-category-user-group-permission.entity';
import { Authorized } from '@monorepo/graphql/authentication-directive';

import { UserGroupRole } from './user-group-role/user-group-role.entity';
import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType, HideField } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { authenticated } from './../../app.authorization';
import { AppEntity } from '../../app.abstract.entity';
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
@Authorized(authenticated)
export class UserGroup extends AppEntity {
  @Column()
  public name!: string;

  @Column({ default: false })
  @FilterableField()
  public isServiceProvider!: boolean;

  @Column({ default: false })
  @FilterableField()
  public isLocationDependent!: boolean;

  @Column({ default: false })
  public isControlCenter!: boolean;

  @Column({ nullable: true })
  public description?: string;

  @Column({ nullable: false, default: true })
  @FilterableField()
  public active!: boolean;

  // @BelongsToMany(() => TaskTemplate, {
  //   through: () => TaskTemplateAssignment,
  //   foreignKey: 'assignedToId',
  //   constraints: false,
  // })
  // public taskTemplates?: TaskTemplate[];

  // @HasMany(() => ScenarioAssignment, {
  //   foreignKey: 'assignedToId',
  //   constraints: false
  // })
  // public assignments?: ScenarioAssignment[];

  // @BelongsToMany(() => ScenarioCategory, {
  //   through: {
  //     model: () => ScenarioAssignment,
  //     // scope: {
  //     //   scenarioType: 'ScenarioCategory'
  //     // },
  //     // unique: false
  //   },
  //   foreignKey: 'assignedToId',
  //   otherKey: 'scenarioOrCategoryId',
  //   constraints: false,
  //   uniqueKey: 'ScenarioAssignments_pkey',
  // })
  // public scenarioCategories?: ScenarioCategory[];

  @HideField()
  @OneToMany(() => User, (user) => user.userGroup)
  public users?: User[];

  @HideField()
  @OneToMany(() => UserGroupRole, (userGroupRole) => userGroupRole.userGroup, {
    persistence: false,
  })
  public userGroupRoles?: UserGroupRole[];

  @HideField()
  @OneToMany(
    () => ScenarioCategoryUserGroupPermission,
    (scenarioCategoryPermission) => scenarioCategoryPermission.scenarioCategory
  )
  public scenarioCategoryPermissions?: ScenarioCategoryUserGroupPermission[];

  // @HasMany(() => UserGroupRole)
  // public userGroupRoles?: UserGroupRole[];
}
