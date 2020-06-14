import { Authorized } from '@monorepo/graphql/authentication-directive';
import { DataLoaderType } from '@monorepo/graphql/dataloader';

import {
  Args,
  Context,
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

import { authenticated } from './../../app.authorization';
import { User } from '../user/user.entity';
import { UserLoader } from '../user/user.loader';
import { UserGroup } from './user-group.entity';
import { CreateUserGroupInput, UpdateUserGroupInput } from './user-group.input';
import { UserGroupLoader } from './user-group.loader';

@Resolver(() => UserGroup)
export class UserGroupResolver {
  constructor(
    @InjectRepository(UserGroup)
    public readonly userGroupRepository: Repository<UserGroup>
  ) {}

  @Authorized(authenticated)
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

  @Authorized(authenticated)
  @Mutation(() => UserGroup)
  public async createUserGroup(
    @Args('data') input: CreateUserGroupInput
  ): Promise<UserGroup> {
    const userGroup = this.userGroupRepository.create(input);
    return this.userGroupRepository.save(userGroup);
  }

  @Authorized(authenticated)
  @Mutation(() => UserGroup)
  public async updateUserGroup(
    @Args('id') id: string,
    @Args('data') input: UpdateUserGroupInput
  ): Promise<UserGroup> {
    const userGroup = await this.userGroupRepository.findOneOrFail(input);
    this.userGroupRepository.merge(userGroup, input);
    return this.userGroupRepository.save(userGroup);
  }

  @Authorized(authenticated)
  @ResolveField(() => User)
  public async users(
    @Parent() parent: UserGroup,
    @Loader(UserLoader.name)
    userLoader: DataLoaderType<User>,
    @Context() ctx: any
  ): Promise<User[]> {
    return userLoader.load({ where: { userGroupId: parent.id } });
  }
}
