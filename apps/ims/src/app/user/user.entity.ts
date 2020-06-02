import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ID, HideField, ObjectType } from '@nestjs/graphql';
import AppEntity from '../../app.abstract.entity';
import UserGroup from '../user-group/user-group.entity';

@Entity()
@ObjectType()
export default class User extends AppEntity {
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
  @Column()
  public securePassword!: string;

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

  @ManyToOne(() => UserGroup, (userGroup) => userGroup.users)
  public userGroup: UserGroup;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  /*
  @HasMany(() => UserRole)
  public removedRoles?: UserRole[];

  public context?: Context;

  public roles?: Role[];
  */
}
