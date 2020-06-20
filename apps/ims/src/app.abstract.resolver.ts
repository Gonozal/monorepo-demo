import { Context } from './types/context';
import {
  Authorized,
  LogicRule,
  Rule,
} from '@monorepo/graphql/authentication-directive';
import { SimplifiedFindOptions } from '@monorepo/graphql/dataloader';
import {
  Connection,
  PaginationArgs,
  PaginationInput,
  recordsToConnection,
  typeormPaginationBuilder,
} from '@monorepo/graphql/pagination';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';

import { Loader } from 'nestjs-dataloader';
import DataLoader from 'dataloader';
import * as pluralize from 'pluralize';
import { FindConditions, Repository } from 'typeorm';

import { authenticated } from './app.authorization';

type Constructable<T> = new () => T;

type AuthRule = Rule<any, any, Context> | LogicRule<any, any, Context>;

interface BaseResolverAuthorizationInfo {
  show: AuthRule;
  index: AuthRule;
  create: AuthRule;
  edit: AuthRule;
  delete: AuthRule;
}

interface InputTypes<TICreate, TIEdit> {
  create: Constructable<TICreate>;
  edit: Constructable<TIEdit>;
}

export function createBaseResolver<T, C, TICreate, TIEdit>(
  objectTypeCls: Constructable<T>,
  objectTypeConnection: Constructable<C>,
  authorization: BaseResolverAuthorizationInfo,
  inputTypes: InputTypes<TICreate, TIEdit>
) {
  const suffix = objectTypeCls.name;
  const pluralizedSuffix = pluralize(suffix);

  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    constructor(
      @InjectRepository(objectTypeCls)
      public readonly primaryRepository: Repository<T>
    ) {}

    @Authorized(authorization.index || authenticated)
    @Query(() => [objectTypeCls], {
      name: `get${pluralizedSuffix}`,
      nullable: false,
    })
    public async getAll(): Promise<T[]> {
      return this.primaryRepository.find();
    }

    @Authorized(authorization.index || authenticated)
    @Query(() => objectTypeConnection, {
      name: `get${suffix}Connection`,
      nullable: false,
    })
    public async getConnection(
      @PaginationArgs() paginationInput: PaginationInput
    ): Promise<Connection<T>> {
      const paginationOptions = typeormPaginationBuilder(paginationInput);
      const [records, totalCount] = await this.primaryRepository.findAndCount(
        paginationOptions as FindConditions<T>
      );
      return recordsToConnection(records, totalCount, paginationOptions);
    }

    @Authorized(authorization.show || authenticated)
    @Query(() => objectTypeCls, { nullable: false, name: `get${suffix}` })
    public async getOne(
      @Args('id') id: string,
      @Loader(`${objectTypeCls.name}Loader`)
      primaryLoader: DataLoader<SimplifiedFindOptions<unknown>, T[]>
    ): Promise<T> {
      const record = await primaryLoader.load({ where: { id } });
      return record[0];
    }

    @Authorized(authorization.create || authenticated)
    @Mutation(() => objectTypeCls, { name: `create${suffix}` })
    public async createRecord(
      @Args('data', { type: () => inputTypes.create }) input: TICreate
    ): Promise<T> {
      const record = this.primaryRepository.create(input);
      return this.primaryRepository.save(record);
    }

    @Authorized(authorization.edit || authenticated)
    @Mutation(() => objectTypeCls, { name: `update${suffix}` })
    public async updateRecord(
      @Args('id') id: string,
      @Args('data', { type: () => inputTypes.edit }) input: TIEdit
    ): Promise<T> {
      const record = await this.primaryRepository.findOneOrFail(id);
      this.primaryRepository.merge(record, input);
      return this.primaryRepository.save(record);
    }

    @Authorized(authorization.delete || authenticated)
    @Mutation(() => Boolean, { name: `delete${suffix}` })
    public async deleteRecord(@Args('id') id: string): Promise<boolean> {
      const record = await this.primaryRepository.findOneOrFail(id);
      const result = await this.primaryRepository.delete(record);
      return Boolean(result.affected && result.affected > 0);
    }
  }

  return BaseResolver;
}
