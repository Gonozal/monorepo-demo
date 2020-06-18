import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserGroupInput {
  public name!: string;
  public active!: boolean;
  public isServiceProvider!: boolean;
  public isLocationDependent!: boolean;
  public isControlCenter!: boolean;
  public description?: string;
}

@InputType()
export class UpdateUserGroupInput extends PartialType(CreateUserGroupInput) {
  // @ValidateNested()
  // public roles?: RoleInput[];
}

@InputType()
export class ToggleUserGroupInput {
  public active!: boolean;
}
