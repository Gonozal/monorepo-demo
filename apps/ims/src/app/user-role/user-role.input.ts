import { RoleId } from './../../types/roles';
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserRoleInput {
  @Field(() => ID)
  roleId!: RoleId;

  @Field(() => ID)
  userId!: string;
}
