import { RoleInput } from './../../role/role.input';
import { FilterableField } from '@nestjs-query/query-graphql';
import { Role } from '../../role/role.entity';
import { RoleId, UserRoleInterface } from '../../../types/roles';
import { roles } from '../../../common/initialize-roles';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { Field, ID, ObjectType, HideField } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { authenticated } from '../../../app.authorization';
import { User } from '../user.entity';

@Entity()
@ObjectType()
@Authorized(authenticated)
export class UserRole {
  @FilterableField(() => ID)
  @PrimaryColumn({ type: 'varchar' })
  roleId!: RoleId;

  @Field(() => ID)
  @PrimaryColumn({ type: 'uuid' })
  userId!: string;

  @Field(() => Role)
  get role(): Role {
    return roles[this.roleId];
  }

  @HideField()
  @ManyToOne(() => User, (user) => user.disabledRoles)
  user?: User;

  public static fromRoleInput(
    roleIds: RoleInput[] | undefined,
    userId: string
  ): UserRoleInterface[] {
    if (!roleIds) return [];

    return roleIds.map((roleInput) => {
      return { userId, roleId: roleInput.roleId };
    });
  }
}
