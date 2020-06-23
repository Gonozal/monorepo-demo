import { UserRole } from '../app/user/user-role/user-role.entity';
import { UserGroupRole } from '../app/user-group/user-group-role/user-group-role.entity';
import { Role } from './../app/role/role.entity';
import { UserGroup } from './../app/user-group/user-group.entity';
import { User } from './../app/user/user.entity';

export interface Context {
  user?: User & {
    userGroup: UserGroup & { userGroupRoles: UserGroupRole[] };
    roles: Role[];
    disabledRoles: UserRole[];
  };
}
