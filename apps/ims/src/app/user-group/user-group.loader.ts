import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'nestjs-dataloader';
import UserGroup from './user-group.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class UserGroupLoader
  implements NestDataLoader<string, UserGroup> {
  constructor(
    @InjectRepository(UserGroup)
    public readonly userGroupRepository: Repository<UserGroup>
  ) {}

  generateDataLoader(): DataLoader<string, UserGroup> {
    return new DataLoader<UserGroup['id'], UserGroup>((keys) => {
      const ids: string[] = keys as string[];
      return this.userGroupRepository.findByIds(ids);
    });
  }
}
