import { AssociationInput } from './../../app.input';
import { Priority } from './../../types/priority';
import { TaskTemplate } from './task-template.entity';
import {
  CreateOneInputType,
  CreateManyInputType,
  UpdateOneInputType,
  UpdateManyInputType,
} from '@nestjs-query/query-graphql';
import { ValidateNested } from 'class-validator';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateTaskTemplateInput {
  @Field(() => ID)
  title!: string;

  description?: string;

  @Field(() => Priority)
  priority!: Priority;

  dueTimeOffset!: number;
  reminderOffset!: number;

  initialStatusId!: string;

  @Field(() => [AssociationInput], { nullable: true })
  @ValidateNested()
  public users?: AssociationInput[];

  @Field(() => [AssociationInput], { nullable: true })
  @ValidateNested()
  public userGroups?: AssociationInput[];
}

@InputType()
export class UpdateTaskTemplateInput extends PartialType(
  CreateTaskTemplateInput
) {}

@InputType()
export class CreateOneTaskTemplateInput extends CreateOneInputType(
  'taskTemplate',
  CreateTaskTemplateInput
) {}

@InputType()
export class CreateManyTaskTemplateInput extends CreateManyInputType(
  'taskTemplate',
  CreateTaskTemplateInput
) {}

@InputType()
export class UpdateOneTaskTemplateInput extends UpdateOneInputType(
  UpdateTaskTemplateInput
) {}

@InputType()
export class UpdateManyTaskTemplateInput extends UpdateManyInputType(
  TaskTemplate,
  UpdateTaskTemplateInput
) {}
