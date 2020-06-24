import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { UserGroup } from './user-group.entity';

@EventSubscriber()
export class UserGroupSubscriber<Entity extends UserGroup>
  implements EntitySubscriberInterface<UserGroup> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo(): typeof UserGroup {
    return UserGroup;
  }

  public beforeInsert(event: InsertEvent<Entity>): void {
    this.setId(event.entity);
  }

  private setId(entity: Entity) {
    if (!entity.id) entity.id = UserGroup.generateId();
  }
}
