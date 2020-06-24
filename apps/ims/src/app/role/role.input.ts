import { InputType, Field, ID } from '@nestjs/graphql';
import { RoleId } from './../../types/roles';

@InputType()
export class RoleInput {
  @Field(() => ID)
  public roleId!: RoleId;
}
