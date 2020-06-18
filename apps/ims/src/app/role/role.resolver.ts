import { RoleId } from './../../types/roles';
import { Authorized } from '@monorepo/graphql/authentication-directive';

import { roles } from '../../common/initialize-roles';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { authenticated } from './../../app.authorization';
import { Role } from './role.entity';

@Resolver(() => Role)
export class RoleResolver {
  @Authorized(authenticated)
  @Query(() => [Role])
  public async getRoles(): Promise<Role[]> {
    return Object.values(roles);
  }

  @Authorized(authenticated)
  @Query(() => Role, { nullable: false })
  public async getRole(
    @Args('id', { type: () => String }) id: RoleId
  ): Promise<Role> {
    return roles[id];
  }
}
