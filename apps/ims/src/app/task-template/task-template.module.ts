import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { TaskTemplateQueryService } from './task-template.service';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { TaskTemplate } from './task-template.entity';
import { TaskTemplateLoader } from './task-template.loader';
import { TaskTemplateResolver } from './task-template.resolver';
import { TaskTemplateSubscriber } from './task-template.subscriber';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([TaskTemplate])],
      services: [TaskTemplateQueryService],
      resolvers: [],
    }),
  ],
  providers: [
    TaskTemplateResolver,
    TaskTemplateLoader,
    TaskTemplateSubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class TaskTemplateModule {}
