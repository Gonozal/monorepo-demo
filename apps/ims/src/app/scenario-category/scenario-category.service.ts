import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScenarioCategory } from './scenario-category.entity';

@QueryService(ScenarioCategory)
export class ScenarioCategoryQueryService extends TypeOrmQueryService<
  ScenarioCategory
> {
  constructor(
    @InjectRepository(ScenarioCategory) repo: Repository<ScenarioCategory>
  ) {
    super(repo);
  }
}
