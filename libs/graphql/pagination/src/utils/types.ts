import { PageInfo } from './../lib/object-type';

export enum AscDesc {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface OrderOptions {
  [key: string]: AscDesc;
}

export interface PaginationData {
  order?: OrderOptions;
  skip: number;
  take: number;
}

export interface SQLOffset {
  skip: number;
  take: number;
}

export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
  totalCount: number;
}
