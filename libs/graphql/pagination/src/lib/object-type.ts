import { AscDesc } from './../utils/types';
import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

registerEnumType(AscDesc, {
  name: 'AscDesc',
  description: 'Ascending/Descending sort order for a field',
});

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  hasPreviousPage!: boolean;

  @Field(() => Boolean)
  hasNextPage!: boolean;

  @Field(() => String)
  startCursor!: string;

  @Field(() => String)
  endCursor!: string;
}

export function Paginated<T>(classRef: Type<T>) {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor!: string;

    @Field(() => classRef)
    node!: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType])
    edges!: EdgeType[];

    @Field(() => PageInfo)
    pageInfo!: PageInfo;

    @Field(() => Number)
    totalCount!: number;
  }
  return PaginatedType;
}
