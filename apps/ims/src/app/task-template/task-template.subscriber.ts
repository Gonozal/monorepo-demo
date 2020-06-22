import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';

import { TaskTemplate } from './task-template.entity';

@EventSubscriber()
export class TaskTemplateSubscriber implements EntitySubscriberInterface<TaskTemplate> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo(): typeof TaskTemplate {
    return TaskTemplate;
  }
}
