import { InputType, Field } from '@nestjs/graphql';
import { Min, IsInt } from 'class-validator';
import { AscDesc } from './../utils/types';

export const paginationDefaults: PaginationInput = {
  orderByField: 'createdAt',
  orderByDirection: AscDesc.DESC,
};

@InputType()
export class PaginationInput {
  @Field({ defaultValue: paginationDefaults.orderByField })
  public orderByField!: string;

  @Field(() => AscDesc, { defaultValue: paginationDefaults.orderByDirection })
  public orderByDirection!: AscDesc;

  @IsInt()
  @Min(0)
  @Field(() => Number, { nullable: true })
  public first?: number;

  @Field(() => String, { nullable: true })
  public after?: string;

  @IsInt()
  @Min(0)
  @Field(() => Number, { nullable: true })
  public last?: number;

  @Field(() => String, { nullable: true })
  public before?: string;
}
