import { registerEnumType } from '@nestjs/graphql';

export enum StatusType {
  TODO = 'TODO',
  IN_PROGRESS = 'IN PROGRES',
  DONE = 'DONE',
}

registerEnumType(StatusType, {
  name: 'StatusType',
  description: 'Task Status Type',
});
