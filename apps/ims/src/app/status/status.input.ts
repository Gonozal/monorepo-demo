import { StatusType } from './../../types/status';
import { Status } from './status.entity';
import {
  CreateOneInputType,
  CreateManyInputType,
  UpdateOneInputType,
  UpdateManyInputType,
} from '@nestjs-query/query-graphql';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsHexColor } from 'class-validator';

@InputType()
export class CreateStatusInput {
  public name!: string;

  @IsHexColor()
  public color!: string;

  public isDefault!: boolean;

  @Field(() => StatusType, { nullable: false })
  public type!: StatusType;
}

@InputType()
export class UpdateStatusInput extends PartialType(CreateStatusInput) {}

@InputType()
export class CreateOneStatusInput extends CreateOneInputType(
  'status',
  CreateStatusInput
) {}

@InputType()
export class CreateManyStatusInput extends CreateManyInputType(
  'status',
  CreateStatusInput
) {}

@InputType()
export class UpdateOneStatusInput extends UpdateOneInputType(
  UpdateStatusInput
) {}

@InputType()
export class UpdateManyStatusInput extends UpdateManyInputType(
  Status,
  UpdateStatusInput
) {}
