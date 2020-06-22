import { UserRoleModule } from './user-role/user-role.module';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { UserSubscriber } from './user.subscriber';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { User } from './user.entity';
import { UserLoader } from './user.loader';
import { UserResolver } from './user.resolver';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([User]), UserRoleModule],
  providers: [
    UserResolver,
    UserLoader,
    UserSubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class UserModule {}
