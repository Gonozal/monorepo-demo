import { RoleInput } from './../role/role.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import {
  CreateOneInputType,
  CreateManyInputType,
  UpdateOneInputType,
  UpdateManyInputType,
} from '@nestjs-query/query-graphql';
import { ValidateNested } from 'class-validator';
import { UserGroup } from './user-group.entity';

@InputType()
export class CreateUserGroupInput {
  public name!: string;
  public isServiceProvider!: boolean;
  public isLocationDependent!: boolean;
  public isControlCenter!: boolean;
  public description?: string;
  public active!: boolean;

  @Field(() => [RoleInput])
  @ValidateNested()
  public userGroupRoles!: RoleInput[];
}

@InputType()
export class UpdateUserGroupInput extends PartialType(CreateUserGroupInput) {}

@InputType()
export class CreateOneUserGroupInput extends CreateOneInputType(
  'userGroup',
  CreateUserGroupInput
) {}

@InputType()
export class CreateManyUserGroupInput extends CreateManyInputType(
  'userGroup',
  CreateUserGroupInput
) {}

@InputType()
export class UpdateOneUserGroupInput extends UpdateOneInputType(
  UpdateUserGroupInput
) {}

@InputType()
export class UpdateManyUserGroupInput extends UpdateManyInputType(
  UserGroup,
  UpdateUserGroupInput
) {}
