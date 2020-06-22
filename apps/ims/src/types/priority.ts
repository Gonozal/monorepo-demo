import { registerEnumType } from '@nestjs/graphql';

export enum Priority {
  HIGH = 'HIGH',
  NORMAL = 'NORMAL',
  LOW = 'LOW',
}

registerEnumType(Priority, {
  name: 'Priority',
  description: 'Task Priority',
});
