import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { Status } from './status.entity';

@EventSubscriber()
export class StatusSubscriber<Entity extends Status>
  implements EntitySubscriberInterface<Status> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo(): typeof Status {
    return Status;
  }

  public beforeInsert(event: InsertEvent<Entity>): void {
    this.setId(event.entity);
  }

  private setId(entity: Entity) {
    if (!entity.id) entity.id = Status.generateId();
  }
}
