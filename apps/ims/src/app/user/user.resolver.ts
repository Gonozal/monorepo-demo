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

import { authenticated } from './../../app.authorization';
import { UserGroup } from '../user-group/user-group.entity';
import { UserGroupLoader } from '../user-group/user-group.loader';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { UserLoader } from './user.loader';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) public readonly userRepository: Repository<User>
  ) {}

  @Authorized(authenticated)
  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Authorized(authenticated)
  @Query(() => User, { nullable: true })
  public async getUser(
    @Args('id') id: string,
    @Loader(UserLoader.name)
    userLoader: DataLoader<string, User>
  ): Promise<User> {
    return userLoader.load(id);
  }

  @Authorized(authenticated)
  @Mutation(() => User)
  public async createUser(@Args('data') input: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(input);
    return this.userRepository.save(user);
  }

  @Authorized(authenticated)
  @Mutation(() => User)
  public async updateUser(
    @Args('id') id: string,
    @Args('data') input: UpdateUserInput
  ): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    this.userRepository.merge(user, input);
    return this.userRepository.save(user);
  }

  @Authorized(authenticated)
  @ResolveField(() => UserGroup)
  public async userGroup(
    @Parent() parent: User,
    @Loader(UserGroupLoader.name)
    userGroupLoader: DataLoaderType<UserGroup>
  ): Promise<UserGroup> {
    const userGroups = await userGroupLoader.load({
      where: { id: parent.userGroupId },
    });
    return userGroups[0];
  }
}
