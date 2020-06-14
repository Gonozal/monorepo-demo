import { InputType, PartialType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => ID)
  userGroupId!: string;

  firstName!: string;
  lastName!: string;
  email!: string;

  roleName?: string;
  description?: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  // @ValidateNested()
  // roles?: RoleInput[];
}
