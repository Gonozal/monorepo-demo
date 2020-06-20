# graphql-pagination

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test graphql-pagination` to execute the unit tests via [Jest](https://jestjs.io).


## Pagination

This Pagination Library (almost) complies with [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm) by Relay.
See also the pagination article on [graphql.org](https://graphql.org/learn/pagination/#pagination-and-edges). Note that the article does NOT comply with the Relay-Specification, but it does a good job at explaining the concept of pagination in GraphQL.

Notable breaks from the Relay Specification:
- the `first` argument for forward pagination can be supplied without a `after` argument ( couldn't determine weather this is against the spec or not.)
- Supplying arguments for both forward pagination **and** backwards pagination (e.g. both `after` and `before`) is not supported and will throw a runtime error.


## Usage

The Library exports a small number of utility functions and decorators
to make Writing Connection-Based queries and field-resolvers easier.

See the full example below for detailed information.


```typescript
import {
  Paginated,
  Connection,
  PaginationArgs,
  PaginationInput,
  recordsToConnection,
  typeormPaginationBuilder,
} from '@monorepo/graphql/pagination';
import { Query, Resolver, ObjectType, Field } from '@nestjs/graphql';

// This is the base entity. E.g. your ORM Entity or custom class
@ObjectType
class DemoEntity {
  @Field
  id: string

  @Field
  name: string
}

// `Paginated` wraps the existing ObjectType and transforms it into
// A "Connection Type" as per relay specification
@ObjectType()
class DemoConnection extends Paginated(User) {}


@Resolver()
class DemoResolver {
  @Query(() => DemoConnection, { nullable: false })
  public async getConnection(
    // Thin wrapper around the 'Args' decorator
    // The paginationInput includes a DESC default sort-order 
    // based on the `createdAt` attribute
    @PaginationArgs() paginationInput: PaginationInput
  ): Promise<Connection<T>> {
    // typeormPaginationBuilder transforms first/after, last/before arguments
    // into {take: number, skip: number} so typeORM can work with them.
    // It also returns the sort arguments from the paginationInput
    const paginationOptions = typeormPaginationBuilder(paginationInput);
    
    // Query only enough records to satisfy the request from the client.
    // Include the `totalCount` so the frontend can make a decision
    // when it comes to pagination. This also allows us to always make
    // a useful decisions when it comes to the `hasNextPage` and 
    // `hasPreviousPage` return values
    const [records, totalCount] = await this.primaryRepository.findAndCount(
      paginationOptions as FindConditions<T>
    );
    
    // Transform the returned records into the actual Connection-Type.
    // Without this wrapper, we'd just be returning an array of records.
    return recordsToConnection(records, totalCount, paginationOptions);
  }
}
```
