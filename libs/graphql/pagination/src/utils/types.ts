export enum AscDesc {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface OrderOptions {
  [key: string]: AscDesc;
}

export interface PaginationData {
  order?: OrderOptions;
  skip?: number;
  take?: number;
}
