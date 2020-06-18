import { RoleInterface, RoleIndex, RoleId } from '../../types/roles';
import { Authorized } from '@monorepo/graphql/authentication-directive';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { authenticated } from './../../app.authorization';

@ObjectType()
@Authorized(authenticated)
export class Role implements RoleInterface {
  @Field(() => ID)
  id!: RoleId;

  iconName?: string;
  navKey?: string;
  navSegment?: number;
  order!: number;

  constructor(
    { id, iconName, navSegment, navKey }: RoleInterface,
    index: number
  ) {
    this.id = id;
    this.iconName = iconName;
    this.navSegment = navSegment;
    this.navKey = navKey;
    this.order = index;
  }

  public static fromPrototypes(roles: RoleInterface[]): RoleIndex {
    return roles.reduce((result, role, index) => {
      return {
        ...result,
        [role.id]: new Role(role, index),
      };
    }, {} as RoleIndex);
  }
}
