import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { UserGroupRole } from './user-group-role.entity';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([UserGroupRole])],
  providers: [],
})
export class UserGroupRoleModule {}
