import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ScenarioCategory } from './scenario-category.entity';
import { GraphQLDataLoader } from '@monorepo/graphql/dataloader';

@Injectable()
export class ScenarioCategoryLoader<T = ScenarioCategory> extends GraphQLDataLoader<
  T
> {
  constructor(@InjectRepository(ScenarioCategory) primaryRepository: Repository<T>) {
    super();
    this.primaryRepository = primaryRepository;
  }
}
