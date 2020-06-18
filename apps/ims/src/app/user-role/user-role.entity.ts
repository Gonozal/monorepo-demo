import { Role } from './../role/role.entity';
import { RoleId } from './../../types/roles';
import { roles } from './../../common/initialize-roles';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne, Column, PrimaryColumn } from 'typeorm';

import { authenticated } from './../../app.authorization';
import { AppEntity } from '../../app.abstract.entity';
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
@Authorized(authenticated)
export class UserRole {
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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.disabledRoles)
  user?: User;
}
