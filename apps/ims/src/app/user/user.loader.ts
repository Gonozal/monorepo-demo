import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { NestDataLoader } from 'nestjs-dataloader';
import User from './user.entity';

@Injectable()
export default class UserLoader implements NestDataLoader<string, User> {
  constructor(
    @InjectRepository(User) public readonly userRepository: Repository<User>
  ) {}

  generateDataLoader(): DataLoader<string, User> {
    return new DataLoader<User['id'], User>((keys) => {
      const ids: string[] = keys as string[];
      return this.userRepository.findByIds(ids);
    });
  }
}
