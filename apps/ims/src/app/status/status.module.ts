import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { Status } from './status.entity';
import { StatusLoader } from './status.loader';
import { StatusResolver } from './status.resolver';
import { StatusSubscriber } from './status.subscriber';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([Status])],
  providers: [
    StatusResolver,
    StatusLoader,
    StatusSubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class StatusModule {}
