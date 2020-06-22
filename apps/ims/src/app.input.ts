import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class JoinTableRelationInput {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => [ID], { nullable: false })
  relationIds!: string[];
}
