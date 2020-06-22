import { RoleId } from '../../../types/roles';
import { InputType, ID, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserGroupRoleInput {
  @Field(() => ID)
  roleId!: RoleId;

  @Field(() => ID)
  userGroupId!: string;
}
