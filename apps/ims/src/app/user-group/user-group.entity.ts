import { Authorized } from '@monorepo/graphql/authentication-directive';
import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

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
  public isServiceProvider!: boolean;

  @Column({ default: false })
  public isLocationDependent!: boolean;

  @Column({ default: false })
  public isControlCenter!: boolean;

  @Column({ nullable: true })
  public description?: string;

  @Column({ nullable: false, default: true })
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

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.userGroup)
  public users?: User[];

  @Field(() => Date)
  @CreateDateColumn()
  public createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  public updatedAt!: Date;

  // @HasMany(() => UserGroupRole)
  // public userGroupRoles?: UserGroupRole[];
}
