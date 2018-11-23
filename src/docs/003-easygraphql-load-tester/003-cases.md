---
title: Success cases
---

If you want to share your success case using [`easygraphql-load-tester`](https://github.com/EasyGraphQL/easygraphql-load-tester)
feel free to create a [PR](https://github.com/EasyGraphQL/easygraphql-load-tester/pulls) so the community
can learn from your story.

## Importance of using dataloaders

Some time ago I was working on a GraphQL project that includes activities and 
each activity can have some comments with the info of the user that created the comment. 
The first thing that you might think is that it is a problem of query n + 1 , and yes; it is!

I decided to implement dataloaders but for some reason, there was an error on the 
implementation, so it wasn't caching the query and the result was a lot of 
request to the database. After finding that issue I implemented it on the right 
way reducing the queries to the database from 46 to 6.

### Results without dataloaders

```shell
All virtual users finished
Summary report @ 10:07:55(-0500) 2018-11-23
  Scenarios launched:  5
  Scenarios completed: 5
  Requests completed:  295
  RPS sent: 36.88
  Request latency:
    min: 1.6
    max: 470.9
    median: 32.9
    p95: 233.2
    p99: 410.8
  Scenario counts:
    GraphQL Query load test: 5 (100%)
  Codes:
    200: 295
```

### Results with dataloaders

```shell
All virtual users finished
Summary report @ 10:09:09(-0500) 2018-11-23
  Scenarios launched:  5
  Scenarios completed: 5
  Requests completed:  295
  RPS sent: 65.85
  Request latency:
    min: 1.5
    max: 71.9
    median: 3.3
    p95: 19.4
    p99: 36.2
  Scenario counts:
    GraphQL Query load test: 5 (100%)
  Codes:
    200: 295
```