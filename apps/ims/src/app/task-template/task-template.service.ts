import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskTemplate } from './task-template.entity';

@QueryService(TaskTemplate)
export class TaskTemplateQueryService extends TypeOrmQueryService<
  TaskTemplate
> {
  constructor(@InjectRepository(TaskTemplate) repo: Repository<TaskTemplate>) {
    super(repo);
  }
}
