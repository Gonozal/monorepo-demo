import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Status } from './status.entity';
import { GraphQLDataLoader } from '@monorepo/graphql/dataloader';

@Injectable()
export class StatusLoader<T = Status> extends GraphQLDataLoader<
  T
> {
  constructor(@InjectRepository(Status) primaryRepository: Repository<T>) {
    super();
    this.primaryRepository = primaryRepository;
  }
}
