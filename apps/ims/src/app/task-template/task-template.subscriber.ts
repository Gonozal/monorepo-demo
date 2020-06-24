import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { TaskTemplate } from './task-template.entity';

@EventSubscriber()
export class TaskTemplateSubscriber<Entity extends TaskTemplate>
  implements EntitySubscriberInterface<TaskTemplate> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  public listenTo(): typeof TaskTemplate {
    return TaskTemplate;
  }

  public beforeInsert(event: InsertEvent<Entity>): void {
    this.setId(event.entity);
  }

  private setId(entity: Entity) {
    if (!entity.id) entity.id = TaskTemplate.generateId();
  }
}
