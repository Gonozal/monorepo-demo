import { Authorized } from '@monorepo/graphql/authentication-directive';
import { DataLoaderType } from '@monorepo/graphql/dataloader';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { Repository } from 'typeorm';
import { hasRole } from '../role/role.authorization';
import { User } from '../user/user.entity';
import { UserLoader } from '../user/user.loader';
import { authenticated } from './../../app.authorization';
import { UserGroup } from './user-group.entity';
import {
  CreateUserGroupInput,
  ToggleUserGroupInput,
  UpdateUserGroupInput,
} from './user-group.input';
import { UserGroupLoader } from './user-group.loader';

@Resolver(() => UserGroup)
export class UserGroupResolver {
  constructor(
    @InjectRepository(UserGroup)
    public readonly userGroupRepository: Repository<UserGroup>
  ) {}

  @Authorized(hasRole('admin.userGroups'))
  @Query(() => [UserGroup])
  public async getUserGroups(): Promise<UserGroup[]> {
    return this.userGroupRepository.find();
  }

  @Authorized(authenticated)
  @Query(() => UserGroup, { nullable: true })
  public async getUserGroup(
    @Args('id') id: string,
    @Loader(UserGroupLoader.name)
    userGroupLoader: DataLoader<string, UserGroup>
  ): Promise<UserGroup> {
    return userGroupLoader.load(id);
  }

  @Authorized(hasRole('admin.userGroups.create'))
  @Mutation(() => UserGroup)
  public async createUserGroup(
    @Args('data') input: CreateUserGroupInput
  ): Promise<UserGroup> {
    const userGroup = this.userGroupRepository.create(input);
    return this.userGroupRepository.save(userGroup);
  }

  @Authorized(hasRole('admin.userGroups.edit'))
  @Mutation(() => UserGroup)
  public async updateUserGroup(
    @Args('id') id: string,
    @Args('data') input: UpdateUserGroupInput
  ): Promise<UserGroup> {
    const userGroup = await this.userGroupRepository.findOneOrFail(id);
    this.userGroupRepository.merge(userGroup, input);
    return this.userGroupRepository.save(userGroup);
  }

  @Authorized(hasRole('admin.userGroups.toggleActive'))
  @Mutation(() => UserGroup)
  public async toggleUserGroup(
    @Args('id') id: string,
    @Args('data') input: ToggleUserGroupInput
  ): Promise<UserGroup> {
    const userGroup = await this.userGroupRepository.findOneOrFail(id);
    this.userGroupRepository.merge(userGroup, input);
    return this.userGroupRepository.save(userGroup);
  }

  @Authorized(hasRole('admin.userGroups.delete'))
  @Mutation(() => Boolean)
  public async deleteUserGroup(@Args('id') id: string): Promise<boolean> {
    const userGroup = await this.userGroupRepository.findOneOrFail(id);
    const result = await this.userGroupRepository.delete(userGroup);
    return Boolean(result.affected && result.affected > 0);
  }

  @Authorized(hasRole('users.users'))
  @ResolveField(() => [User])
  public async users(
    @Parent() parent: UserGroup,
    @Loader(UserLoader.name)
    userLoader: DataLoaderType<User>
  ): Promise<User[]> {
    return userLoader.load({ where: { userGroupId: parent.id } });
  }
}
