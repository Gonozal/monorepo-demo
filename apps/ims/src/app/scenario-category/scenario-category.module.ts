import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { ScenarioCategory } from './scenario-category.entity';
import { ScenarioCategoryLoader } from './scenario-category.loader';
import { ScenarioCategoryResolver } from './scenario-category.resolver';
import { ScenarioCategorySubscriber } from './scenario-category.subscriber';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([ScenarioCategory])],
  providers: [
    ScenarioCategoryResolver,
    ScenarioCategoryLoader,
    ScenarioCategorySubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class ScenarioCategoryModule {}
