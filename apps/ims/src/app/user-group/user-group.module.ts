import { UserGroupSubscriber } from './user-group.subscriber';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { UserGroup } from './user-group.entity';
import { UserGroupLoader } from './user-group.loader';
import { UserGroupResolver } from './user-group.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserGroup])],
  providers: [
    UserGroupResolver,
    UserGroupLoader,
    UserGroupSubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class UserGroupModule {}
