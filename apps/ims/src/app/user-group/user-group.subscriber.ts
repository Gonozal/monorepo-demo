import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';

import { UserGroup } from './user-group.entity';

@EventSubscriber()
export class UserGroupSubscriber
  implements EntitySubscriberInterface<UserGroup> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo(): typeof UserGroup {
    return UserGroup;
  }
}
