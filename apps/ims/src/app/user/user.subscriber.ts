import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber<Entity extends User>
  implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  public listenTo(): typeof User {
    return User;
  }

  public beforeInsert(event: InsertEvent<Entity>): void {
    this.setId(event.entity);
  }

  private setId(entity: Entity) {
    entity.id = User.generateId();
  }
}
