import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';

import { Status } from './status.entity';

@EventSubscriber()
export class StatusSubscriber implements EntitySubscriberInterface<Status> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo(): typeof Status {
    return Status;
  }
}
