import { InjectRepository } from '@nestjs/typeorm';
import {
  Args,
  Mutation,
  Parent,
  Query,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput } from './user.input';
import UserGroup from '../user-group/user-group.entity';
import User from './user.entity';
import { Loader } from 'nestjs-dataloader';
import DataLoader from 'dataloader';
import UserGroupLoader from '../user-group/user-group.loader';
import UserLoader from './user.loader';
import { Repository } from 'typeorm';

@Resolver(() => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User) public readonly userRepository: Repository<User>
  ) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Query(() => User, { nullable: true })
  public async getUser(
    @Args('id') id: string,
    @Loader(UserLoader.name)
    userLoader: DataLoader<string, User>
  ): Promise<User> {
    return userLoader.load(id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(input);
    return this.userRepository.save(user);
  }

  @Mutation(() => User)
  public async updateUser(
    @Args('id') id: string,
    @Args('data') input: UpdateUserInput
  ): Promise<User> {
    const user = await this.userRepository.findOneOrFail(input);
    this.userRepository.merge(user, input);
    return this.userRepository.save(user);
  }

  @ResolveField(() => UserGroup)
  public async userGroup(
    @Parent() parent,
    @Loader(UserGroupLoader.name)
    userGroupLoader: DataLoader<string, UserGroup>
  ): Promise<UserGroup> {
    return userGroupLoader.load(parent.userGroupId);
  }
}
