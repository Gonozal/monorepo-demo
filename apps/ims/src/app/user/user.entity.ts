import { RelationNotLoadedError } from './../../common/Errors';
import { Authorized } from '@monorepo/graphql/authentication-directive';

import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { authenticated } from './../../app.authorization';
import { AppEntity } from '../../app.abstract.entity';
import { UserGroup } from '../user-group/user-group.entity';
import { Role } from '../role/role.entity';
import { UserRole } from './user-role/user-role.entity';

@Entity()
@ObjectType()
@Authorized(authenticated)
export class User extends AppEntity {
  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Field()
  public get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column()
  @FilterableField()
  public email!: string;

  @Column({ nullable: true })
  @FilterableField()
  public roleName?: string;

  @Column({ nullable: true })
  public mobileNumber?: string;

  // TODO:
  //  - SSO data
  //  - Scenario-Association
  //  - Location-Association
  //  - Task-Association
  //  - Permission-Override
  //  - Last login at

  @HideField()
  public password?: string;

  @HideField()
  public passwordConfirmation?: string;

  @HideField()
  @Column({ nullable: true })
  public securePassword?: string;

  // @HasMany(() => ScenarioAssignment, {
  //   foreignKey: 'assignedToId',
  //   constraints: false
  // })
  // public assignments?: ScenarioAssignment[];

  // @BelongsToMany(() => TaskTemplate, {
  //   through: () => TaskTemplateAssignment,
  //   foreignKey: 'assignedToId',
  //   constraints: false,
  // })
  // public taskTemplates?: TaskTemplate[];

  // @BelongsToMany(() => ScenarioCategory, {
  //   through: {
  //     model: () => ScenarioAssignment,
  //     scope: {
  //       scenarioType: 'ScenarioCategory'
  //     },
  //     unique: false
  //   },
  //   foreignKey: 'assignedToId',
  //   otherKey: 'scenarioOrCategoryId',
  //   constraints: false,
  //   uniqueKey: 'ScenarioAssignments_pkey'
  // })
  // public scenarioCategories?: ScenarioCategory[];

  @Field(() => ID)
  @Column('uuid')
  public userGroupId!: string;

  @HideField()
  @ManyToOne(() => UserGroup, (userGroup) => userGroup.users)
  public userGroup?: UserGroup;

  @HideField()
  @OneToMany(() => UserRole, (userRole) => userRole.user)
  public disabledRoles?: UserRole[];

  @HideField()
  private _roles?: Role[];

  @HideField()
  public get roles(): Role[] {
    // use cached value if available
    if (this._roles) return this._roles;
    // We need a bunch of attributes/relations loaded to make a decision.
    if (
      !this.userGroup ||
      !this.userGroup.userGroupRoles ||
      !this.disabledRoles
    ) {
      throw new RelationNotLoadedError();
    }

    // Start with the roles from the user-group as a baseline
    const roles: Role[] = this.userGroup.userGroupRoles.map(
      (userGroupRole) => userGroupRole.role
    );

    this._roles = roles.filter((role) => {
      // Disable role if any disabled roles match the
      // current role (the one coming from the group)
      return !this.disabledRoles?.some(
        (disabledRole) => disabledRole.roleId === role.id
      );
    });
    return this._roles;
  }

  @FilterableField(() => Date)
  @CreateDateColumn()
  public createdAt!: Date;

  @FilterableField(() => Date)
  @UpdateDateColumn()
  public updatedAt!: Date;

  /*
  @HasMany(() => UserRole)
  public removedRoles?: UserRole[];

  public context?: Context;


  */
}
