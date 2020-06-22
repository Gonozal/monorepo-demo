import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserGroupWithRelations {
  public name!: string;
  public isServiceProvider!: boolean;
  public isLocationDependent!: boolean;
  public isControlCenter!: boolean;
  public description?: string;
  public active!: boolean;

  @Field(() => [ID])
  public roles!: string[];
}
