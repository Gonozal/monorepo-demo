import { Edge, Connection } from './../utils/types';
import { PageInfo } from './object-type';
import { SQLOffset } from '../utils/types';
import { PaginationInput } from './input-type';
import { PaginationData, OrderOptions } from '../utils/types';
import { cursorToOffset, offsetToCursor } from '../utils/cursor';

export function paginationInputToSQLOffset(
  paginationInput: PaginationInput
): SQLOffset {
  const { first, after, last, before } = paginationInput;

  if ((first && last) || (after && before)) {
    throw new Error(
      'For now, either forward or backward pagination parameters must be used, not both'
    );
  }

  if (first) {
    const offset = after ? cursorToOffset(after) : 0;
    return { skip: offset, take: first };
  } else if (last && before) {
    const offset = Math.max(cursorToOffset(before) - last - 1, 0);
    const take = Math.min(cursorToOffset(before) - 1, last);
    return { skip: offset, take: take };
  }
  throw new Error(
    "One pair of 'first & after' or 'last & before' must be supplied"
  );
}

export function typeormPaginationBuilder(
  paginationInput: PaginationInput
): PaginationData {
  const orderBy: OrderOptions = {
    [paginationInput.orderByField]: paginationInput.orderByDirection,
  };
  const sqlOffset = paginationInputToSQLOffset(paginationInput);
  return {
    order: orderBy,
    ...sqlOffset,
  };
}

export function recordsToConnection<T>(
  records: T[],
  totalCount: number,
  sqlOffset: PaginationData
): Connection<T> {
  // "Number" and not "Index" to make it
  // clearer that it's counting from ->1<-, not 0.
  const firstElementNumber = sqlOffset.skip + 1;
  const lastElementNumber = sqlOffset.skip + sqlOffset.take;

  const edges: Edge<T>[] = records.map((record, i) => {
    return {
      node: record,
      cursor: offsetToCursor(firstElementNumber + i),
    };
  });
  const pageInfo: PageInfo = {
    hasNextPage: lastElementNumber < totalCount,
    hasPreviousPage: sqlOffset.skip > 0,
    startCursor: offsetToCursor(firstElementNumber),
    endCursor: offsetToCursor(lastElementNumber),
  };

  return {
    edges,
    pageInfo,
    totalCount,
  };
}
