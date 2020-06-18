import { Role } from './../role/role.entity';
import { roles } from './../../common/initialize-roles';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { authenticated } from './../../app.authorization';
import { AppEntity } from '../../app.abstract.entity';
import { RoleId } from '../../types/roles';
import { UserGroup } from '../user-group/user-group.entity';

@Entity()
@ObjectType()
@Authorized(authenticated)
export class UserGroupRole extends AppEntity {
  @Field(() => ID)
  @PrimaryColumn({ type: 'uuid' })
  roleId!: RoleId;

  @Field(() => ID)
  @PrimaryColumn({ type: 'uuid' })
  userId!: string;

  @Field(() => Role)
  get role(): Role {
    return roles[this.roleId];
  }

  @Field(() => UserGroup)
  @ManyToOne(() => UserGroup, (userGroup) => userGroup.userGroupRoles)
  userGroup?: UserGroup;
}
