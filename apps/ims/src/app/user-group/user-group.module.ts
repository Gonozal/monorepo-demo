import { UserGroupQueryService } from './user-group.service';
import { ScenarioCategoryUserGroupPermissionModule } from './../scenario-category/permissions/user-group/scenario-category-user-group-permission.module';
import { UserGroupRoleModule } from './user-group-role/user-group-role.module';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

import { UserGroupSubscriber } from './user-group.subscriber';
import { Module, forwardRef } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { UserGroup } from './user-group.entity';
import { UserGroupLoader } from './user-group.loader';
import { UserGroupResolver } from './user-group.resolver';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserGroup])],
      services: [UserGroupQueryService],
      resolvers: [],
    }),
    UserGroupRoleModule,
    forwardRef(() => ScenarioCategoryUserGroupPermissionModule),
  ],
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
