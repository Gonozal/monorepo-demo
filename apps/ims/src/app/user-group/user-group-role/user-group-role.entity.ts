import { RoleInput } from './../../role/role.input';
import { FilterableField } from '@nestjs-query/query-graphql';
import { Role } from '../../role/role.entity';
import { roles } from '../../../common/initialize-roles';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { Field, ID, ObjectType, HideField } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { authenticated } from '../../../app.authorization';
import { RoleId, UserGroupRoleInterface } from '../../../types/roles';
import { UserGroup } from '../user-group.entity';

@Entity()
@ObjectType()
@Authorized(authenticated)
export class UserGroupRole {
  @FilterableField(() => ID)
  @PrimaryColumn({ type: 'varchar' })
  roleId!: RoleId;

  @Field(() => ID)
  @PrimaryColumn({ type: 'uuid' })
  userGroupId!: string;

  @Field(() => Role)
  get role(): Role {
    return roles[this.roleId];
  }

  @HideField()
  @ManyToOne(() => UserGroup, (userGroup) => userGroup.userGroupRoles)
  userGroup?: UserGroup;

  public static fromRoleInput(
    roleIds: RoleInput[] | undefined,
    userGroupId: string
  ): UserGroupRoleInterface[] {
    if (!roleIds) return [];

    return roleIds.map((roleInput) => {
      return { userGroupId, roleId: roleInput.roleId };
    });
  }
}
