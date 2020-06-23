import { StatusType } from './../../types/status';
import { TaskTemplate } from './../task-template/task-template.entity';
import { Authorized } from '@monorepo/graphql/authentication-directive';

import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { authenticated } from './../../app.authorization';
import { AppEntity } from '../../app.abstract.entity';

@Entity()
@ObjectType()
@Authorized(authenticated)
export class Status extends AppEntity {
  @Column()
  public name!: string;

  @Column()
  public color!: string;

  @Column({ default: false })
  public isDefault!: boolean;

  @Field(() => StatusType, { nullable: false })
  @Column({
    default: StatusType.TODO,
    type: 'varchar',
  })
  public type!: StatusType;

  @HideField()
  @OneToMany(() => TaskTemplate, (taskTemplate) => taskTemplate.initialStatus)
  taskTemplates?: TaskTemplate[];
}
