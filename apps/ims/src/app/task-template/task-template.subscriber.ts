import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
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

  public async afterUpdate(event: UpdateEvent<Entity>): Promise<void> {
    await this.setUsers(event);
  }

  public async afterInsert(event: InsertEvent<Entity>): Promise<void> {
    await this.setUsers(event);
  }

  public beforeInsert(event: InsertEvent<Entity>): void {
    this.setId(event.entity);
  }

  private async setUsers(
    event: InsertEvent<Entity> | UpdateEvent<Entity>
  ): Promise<void> {
    if (!event.entity.users) return;
    await event.manager
      .createQueryBuilder()
      .relation(TaskTemplate, 'users')
      .of(event.entity.id)
      .set(event.entity.users);
  }

  private setId(entity: Entity) {
    entity.id = TaskTemplate.generateId();
  }
}
