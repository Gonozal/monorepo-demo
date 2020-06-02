import { ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import AppEntity from '../../app.abstract.entity';
import User from '../user/user.entity';

@Entity()
@ObjectType()
export default class UserGroup extends AppEntity {
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

  @Column({ nullable: true, default: true })
  public active?: boolean;

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

  @OneToMany(() => User, (user) => user.userGroup)
  public users: User[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  // @HasMany(() => UserGroupRole)
  // public userGroupRoles?: UserGroupRole[];
}
