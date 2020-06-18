import { InputType, Field, registerEnumType } from '@nestjs/graphql';

enum AscDesc {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(AscDesc, {
  name: 'AscDesc',
  description: 'SQL Sort Direction',
});

export const paginationDefaults: PaginationInput = {
  orderByField: 'createdAt',
  orderByDirection: AscDesc.DESC,
  limit: 50,
  offset: 0,
};

@InputType()
export class PaginationInput {
  @Field({ defaultValue: paginationDefaults.orderByField })
  public orderByField!: string;

  @Field(() => AscDesc, { defaultValue: paginationDefaults.orderByDirection })
  public orderByDirection!: AscDesc;

  @Field({ defaultValue: paginationDefaults.limit })
  public limit!: number;

  @Field({ defaultValue: paginationDefaults.offset })
  public offset!: number;
}

interface OrderOptions {
  [key: string]: AscDesc;
}

export interface PaginationData {
  order?: OrderOptions;
  skip?: number;
  take?: number;
}

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
