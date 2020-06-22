import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TaskTemplate } from './task-template.entity';
import { GraphQLDataLoader } from '@monorepo/graphql/dataloader';

@Injectable()
export class TaskTemplateLoader<T = TaskTemplate> extends GraphQLDataLoader<
  T
> {
  constructor(@InjectRepository(TaskTemplate) primaryRepository: Repository<T>) {
    super();
    this.primaryRepository = primaryRepository;
  }
}
