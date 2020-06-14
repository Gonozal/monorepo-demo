import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';

import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo(): typeof User {
    return User;
  }
}
