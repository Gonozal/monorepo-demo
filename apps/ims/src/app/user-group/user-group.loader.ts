import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserGroup } from './user-group.entity';
import { GraphQLDataLoader } from '@monorepo/graphql/dataloader';

@Injectable()
export class UserGroupLoader<T = UserGroup> extends GraphQLDataLoader<T> {
  constructor(@InjectRepository(UserGroup) primaryRepository: Repository<T>) {
    super();
    this.primaryRepository = primaryRepository;
  }
}
