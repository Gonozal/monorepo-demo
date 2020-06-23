import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';

import { ScenarioCategory } from './scenario-category.entity';

@EventSubscriber()
export class ScenarioCategorySubscriber implements EntitySubscriberInterface<ScenarioCategory> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo(): typeof ScenarioCategory {
    return ScenarioCategory;
  }
}
