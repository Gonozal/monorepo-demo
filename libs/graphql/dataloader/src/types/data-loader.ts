import { SimplifiedFindOptions } from './query-options';
import * as DataLoader from 'dataloader';

export type DataLoaderType<T> = DataLoader<
  SimplifiedFindOptions<T>,
  T[],
  string
>;
