import { Authorized } from '@monorepo/graphql/authentication-directive';
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
import { UserRole } from '../user-role/user-role.entity';
import { Paginated } from '@monorepo/graphql/pagination';

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
  public email!: string;

  @Column({ nullable: true })
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
  public roles?: Role[];

  @Field(() => Date)
  @CreateDateColumn()
  public createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  public updatedAt!: Date;

  /*
  @HasMany(() => UserRole)
  public removedRoles?: UserRole[];

  public context?: Context;


  */
}

@ObjectType()
export class UserConnection extends Paginated(User) {}
