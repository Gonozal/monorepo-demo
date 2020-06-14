import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { GraphQLDataLoader } from '@monorepo/graphql/dataloader';

@Injectable()
export class UserLoader<T = User> extends GraphQLDataLoader<T> {
  constructor(@InjectRepository(User) primaryRepository: Repository<T>) {
    super();
    this.primaryRepository = primaryRepository;
  }
}
