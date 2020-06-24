import { UserModule } from './../../../user/user.module';
import { ScenarioCategoryModule } from './../../scenario-category.module';
import { ScenarioCategoryUserPermissionResolver } from './scenario-category-user-permission.resolver';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ScenarioCategoryUserPermission } from './scenario-category-user-permission.entity';

@Module({
  imports: [
    NestjsQueryTypeOrmModule.forFeature([ScenarioCategoryUserPermission]),
    forwardRef(() => ScenarioCategoryModule),
    forwardRef(() => UserModule),
  ],
  providers: [ScenarioCategoryUserPermissionResolver],
})
export class ScenarioCategoryUserPermissionModule {}
