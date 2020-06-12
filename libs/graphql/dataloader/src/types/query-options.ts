import { FindConditions } from 'typeorm';

export interface SimplifiedFindOptions<T> {
  where: {
    [P in keyof T]?: T[P];
  };
}
