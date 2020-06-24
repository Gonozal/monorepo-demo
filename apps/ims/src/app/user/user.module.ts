import { UserQueryService } from './user.service';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { ScenarioCategoryUserPermissionModule } from './../scenario-category/permissions/user/scenario-category-user-permission.module';
import { UserRoleModule } from './user-role/user-role.module';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { UserSubscriber } from './user.subscriber';
import { Module, forwardRef } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { User } from './user.entity';
import { UserLoader } from './user.loader';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([User])],
      services: [UserQueryService],
      resolvers: [],
    }),
    UserRoleModule,
    forwardRef(() => ScenarioCategoryUserPermissionModule),
  ],
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
