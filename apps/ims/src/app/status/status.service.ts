import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';

@QueryService(Status)
export class StatusQueryService extends TypeOrmQueryService<Status> {
  constructor(@InjectRepository(Status) repo: Repository<Status>) {
    super(repo);
  }
}
