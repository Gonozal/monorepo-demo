import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import User from './user.entity';
import UserLoader from './user.loader';
import UserResolver from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserResolver,
    UserLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export default class UserModule {}
