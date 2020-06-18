import { RoleId } from '../../types/roles';
import { rule, Rule } from '@monorepo/graphql/authentication-directive';

import { Context } from '../../types/context';

export function hasRole(roleId: RoleId): Rule<undefined, undefined, Context> {
  return rule<undefined, undefined, Context>({
    cacheStrategy: 'strict',
    name: `has-role-${roleId}`,
  })(async (source, args, context) => {
    if (!context.user) return false;
    if (!context.user.roles) return false;
    return context.user.roles.findIndex((role) => role.id === roleId) !== -1;
  });
}
