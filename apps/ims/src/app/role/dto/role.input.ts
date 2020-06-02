import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class RoleInput {
  @Field(() => ID, { nullable: false })
  public id!: string;
}
