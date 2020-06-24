import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { ScenarioCategory } from './scenario-category.entity';

@EventSubscriber()
export class ScenarioCategorySubscriber<Entity extends ScenarioCategory>
  implements EntitySubscriberInterface<Entity> {
  public constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  public listenTo(): typeof ScenarioCategory {
    return ScenarioCategory;
  }

  public beforeInsert(event: InsertEvent<Entity>): void {
    this.setId(event.entity);
  }

  private setId(entity: Entity) {
    entity.id = ScenarioCategory.generateId();
  }
}
