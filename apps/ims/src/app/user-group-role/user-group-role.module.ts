import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroupRole } from './user-group-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserGroupRole])],
  providers: [],
})
export class UserGroupRoleModule {}
