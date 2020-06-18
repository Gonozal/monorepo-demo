import { PaginationInput } from './input-type';
import { PaginationData, OrderOptions } from '../utils/types';

export function typeormPagination(
  paginationInput: PaginationInput
): PaginationData {
  const orderBy: OrderOptions = {
    [paginationInput.orderByField]: paginationInput.orderByDirection,
  };
  return {
    order: orderBy,
    skip: paginationInput.offset,
    take: paginationInput.limit,
  };
}
