import { ScenarioCategoryUserGroupPermission } from './scenario-category-user-group-permission.entity';
import { UserGroupModule } from './../../../user-group/user-group.module';
import { ScenarioCategoryModule } from './../../scenario-category.module';
import { ScenarioCategoryUserGroupPermissionResolver } from './scenario-category-user-group-permission.resolver';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  imports: [
    NestjsQueryTypeOrmModule.forFeature([ScenarioCategoryUserGroupPermission]),
    forwardRef(() => ScenarioCategoryModule),
    forwardRef(() => UserGroupModule),
  ],
  providers: [ScenarioCategoryUserGroupPermissionResolver],
})
export class ScenarioCategoryUserGroupPermissionModule {}
