---
title: Usage
---

## How to use it

+ Import `{ tracing, fieldResolver }` from `easygraphql-tracing` package
+ Create a new express middleware with `tracing`
+ On your `graphqlHTTP` function, set the option `fieldResolver`


## Example with express-graphql:

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { tracing, fieldResolver } = require('easygraphql-tracing');

const app = express();

app.use(tracing)

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true,
  fieldResolver
}));

app.listen(4000);
```

## Result
It'll create a table on the console
```
┌─────────────┬─────────────┬─────────────┬─────────────────────────────────┬───────────────┬───────────────┐
│ Field name  │ Parent Type │ Return Type │ Path                            │ Duration (ns) │ Duration (ms) │
├─────────────┼─────────────┼─────────────┼─────────────────────────────────┼───────────────┼───────────────┤
│ uuid        │ Activity    │ ID!         │ getActivityByUuid - uuid        │ 3645          │ 0.003645      │
├─────────────┼─────────────┼─────────────┼─────────────────────────────────┼───────────────┼───────────────┤
│ name        │ Activity    │ String!     │ getActivityByUuid - name        │ 1768          │ 0.001768      │
├─────────────┼─────────────┼─────────────┼─────────────────────────────────┼───────────────┼───────────────┤
│ description │ Activity    │ String      │ getActivityByUuid - description │ 751           │ 0.000751      │
├─────────────┼─────────────┼─────────────┼─────────────────────────────────┼───────────────┼───────────────┤
│ rating      │ Activity    │ Float!      │ getActivityByUuid - rating      │ 913           │ 0.000913      │
└─────────────┴─────────────┴─────────────┴─────────────────────────────────┴───────────────┴───────────────┘
```

<img src='https://raw.githubusercontent.com/EasyGraphQL/easygraphql-tracing/master/result.gif'>