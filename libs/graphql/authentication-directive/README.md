# graphql-authentication-directive

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test authentication-directive` to execute the unit tests via [Jest](https://jestjs.io).

## Rules

/* Read more about cache options down in the `rules/cache` section. */

```typescript
const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, context, info) => {
    return context.user !== null
  },
)

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, context, info) => {
    return context.user.role === 'admin'
  },
)

const isEditor = rule({ cache: 'contextual' })(
  async (parent, args, context, info) => {
    return context.user.role === 'editor'
  },
)

const isOwner = rule({ cache: 'strict' })(
  async (parent, args, context, info) => {
    return context.user.id === parent.ownerId
  },
)
```

### Logic-Rules

```typescript
function and(...rules: Rule[]): LogicRule
function or(...rules: Rule[]): LogicRule
function none(...rules: Rule[]): LogicRule
```



### Rules

All rules must be created using the `rule` function to ensure caches are set correctly. You can apply your `rule` to an Object or specific fields.

Due to how Apollo-GraphQL resolves queries, applying a rule to an object is the same as applying it to all fields of that object, chaining already existing field-level rules with `and()`.


### Cache

You can choose from three different cache options.

1.  `none` - Rules with `none` are never cached. They will be evaluated once for every field it is applied to.
1.  `contextual` - Rules with `contextual` are evaluated only once per request. Be careful when referencing `parent` or `args` in contextually cached rules!
1.  `strict` - Rules with `strict` cache are evaluated on whenever the `parent` or `args` parameters change. This is great for applying a rule to an object-type or multiple fields.

```typescript
// Contextual (default)
const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user.isAdmin
  },
)

// Strict
const isOwner = rule({ cache: 'strict' })(
  async (parent, args, ctx, info) => {
    /* The retrieved object's userId is the same as the user's id. */
    return ctx.user.id === parent.userId
  },
)

// No cache. Note that this example would also work with 'strict' cache.
const admin = rule({ cache: 'non' })(async (parent, args, ctx, info) => {
  return ctx.user.isAdmin || args.code === 'secret' || parent.id === 'theone'
})
```


### Execution-Order and available parameters


#### Query or Mutation

If applied to a `Query` or `Mutation`, rules are applied before the query or mutation is called. This means that a rejected Rule on a query or mutation prevents any code inside it from being evaluated.

Rules applied to a query or mutation will pass any `args` to the rule as the 2nd parameter. The `parent` argument (1st parameter) will always be `undefined`.

Consider applying rules to `ObjectType`s instead of `Query`s, since there's usually more than one way to arrive at a specific object than with just the query itself (e.g. `FieldResolver`). Applying a rule to a query makes you responsible to find all the other places that can lead to the same object and keep the applied rules in sync.

#### Object-Type or Field

If applied to an `ObjectType` or a `Field` on an `ObjectType` (they're equivalent since rules defined on the former are automatically passed down to each `Field`), the rule is evaluated after the `Query` or `Mutation` for that resource has already been evaluated.

 Rules applied to an `ObjectType` will pass the instance of that object to the rule as the 1st parameter. The 2nd parameter will always be `undefined`.

 #### Field-Resolver

Generally I'd strongly advise against applying Rules to a `FieldResolver`.
If you decide to apply a rule to a `FieldResolver`, the **parent**-Object and any arguments supplied during the query will be passed to the rule.

The rule is evaluated before the code inside the `FieldResolver` is run.


#### Overview

| Rule-Target    | parent | args | context | info |
|----------------|--------|------|---------|------|
| Query          |    ⨯   |  ✓   | ✓       | ✓   |
| Mutation       |    ⨯   |  ✓   | ✓       | ✓   |
| Subscription   |    ?   |  ?   | ?       | ?    |
| Field-Resolver |    ✓   |  ✓   | ✓       | ✓   |
| Object-Type    |    ✓   |  ⨯   | ✓       | ✓   |
| Field          |    ✓   |  ⨯   | ✓       | ✓   |


