import { ScenarioCategoryType } from './../../types/scenario-category';
import { ScenarioPermissionType } from './../../types/scenario-permission';
import { ScenarioCategory } from './scenario-category.entity';
import {
  CreateOneInputType,
  CreateManyInputType,
  UpdateOneInputType,
  UpdateManyInputType,
} from '@nestjs-query/query-graphql';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class ScenarioCategoryUserGroupInput {
  @Field(() => ID)
  userGroupId!: string;

  @Field(() => ScenarioPermissionType)
  assignmentType!: ScenarioPermissionType;
}

@InputType()
export class ScenarioCategoryUserInput {
  @Field(() => ID)
  userId!: string;

  @Field(() => ScenarioPermissionType)
  assignmentType!: ScenarioPermissionType;
}

@InputType()
export class CreateScenarioCategoryInput {
  public name!: string;
  public active!: boolean;
  public description?: string;
  public order?: number;

  @Field(() => ScenarioCategoryType)
  public type!: ScenarioCategoryType;

  @Field(() => ID, { nullable: true })
  public parentId?: string;

  @Field(() => ID, { nullable: true })
  public userPermissions?: ScenarioCategoryUserInput[];

  @Field(() => ID, { nullable: true })
  public userGroupPermissions?: ScenarioCategoryUserGroupInput[];
}

@InputType()
export class UpdateScenarioCategoryInput extends PartialType(
  CreateScenarioCategoryInput
) {}

@InputType()
export class CreateOneScenarioCategoryInput extends CreateOneInputType(
  'scenarioCategory',
  CreateScenarioCategoryInput
) {}

@InputType()
export class CreateManyScenarioCategoryInput extends CreateManyInputType(
  'scenarioCategory',
  CreateScenarioCategoryInput
) {}

@InputType()
export class UpdateOneScenarioCategoryInput extends UpdateOneInputType(
  UpdateScenarioCategoryInput
) {}

@InputType()
export class UpdateManyScenarioCategoryInput extends UpdateManyInputType(
  ScenarioCategory,
  UpdateScenarioCategoryInput
) {}
