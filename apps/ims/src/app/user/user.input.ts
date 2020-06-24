import { RoleInput } from './../role/role.input';
import { InputType, PartialType, Field, ID } from '@nestjs/graphql';

import {
  CreateOneInputType,
  CreateManyInputType,
  UpdateOneInputType,
  UpdateManyInputType,
} from '@nestjs-query/query-graphql';
import { ValidateNested } from 'class-validator';
import { User } from './user.entity';

@InputType()
export class CreateUserInput {
  @Field(() => ID)
  userGroupId!: string;

  firstName!: string;
  lastName!: string;
  email!: string;

  roleName?: string;
  description?: string;

  @Field(() => [RoleInput])
  @ValidateNested()
  public disabledRoles!: RoleInput[];
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}

@InputType()
export class CreateOneUserInput extends CreateOneInputType(
  'user',
  CreateUserInput
) {}

@InputType()
export class CreateManyUserInput extends CreateManyInputType(
  'user',
  CreateUserInput
) {}

@InputType()
export class UpdateOneUserInput extends UpdateOneInputType(UpdateUserInput) {}

@InputType()
export class UpdateManyUserInput extends UpdateManyInputType(
  User,
  UpdateUserInput
) {}
