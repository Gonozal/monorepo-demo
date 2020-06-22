import { Priority } from './../../types/priority';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { FilterableField } from '@nestjs-query/query-graphql';

import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
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

  @Column()
  @FilterableField(() => Priority)
  public priority!: string;

  @Column()
  public dueTimeOffset!: number;

  @Column()
  public reminderOffset!: number;

  @HideField()
  @ManyToMany(() => User)
  public users?: User[];

  @HideField()
  @ManyToMany(() => User)
  public userGroups?: UserGroup[];
}
