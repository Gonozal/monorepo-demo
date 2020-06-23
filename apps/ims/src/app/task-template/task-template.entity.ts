import { Status } from './../status/status.entity';
import { Priority } from './../../types/priority';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { FilterableField } from '@nestjs-query/query-graphql';

import { Field, HideField, ObjectType, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import { authenticated } from './../../app.authorization';
import { AppEntity } from '../../app.abstract.entity';
import { User } from '../user/user.entity';
import { UserGroup } from '../user-group/user-group.entity';

@Entity()
@ObjectType()
@Authorized(authenticated)
export class TaskTemplate extends AppEntity {
  @Column()
  public title!: string;

  @Column({ nullable: true })
  public description?: string;

  @Column({ type: 'varchar' })
  @FilterableField(() => Priority)
  public priority!: Priority;

  @Column()
  public dueTimeOffset!: number;

  @Column()
  public reminderOffset!: number;

  @Field(() => ID)
  @Column()
  public initialStatusId!: string;

  @HideField()
  @ManyToOne(() => Status, (status) => status.taskTemplates)
  public initialStatus!: Status;

  @HideField()
  @ManyToMany(() => User)
  public users?: User[];

  @HideField()
  @ManyToMany(() => User)
  public userGroups?: UserGroup[];
}
