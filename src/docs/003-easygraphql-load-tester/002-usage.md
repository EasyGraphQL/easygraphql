---
title: Usage
---

[`easygraphql-load-tester`](https://github.com/EasyGraphQL/easygraphql-load-tester) can be used in two ways for the moment; 
the first one is using `.artillery()` with a [artillery](https://artillery.io) setup, or the second one is `.createQuery()`
that'll create the queries, so you can use with your favorite load tester.

## How to use it?

+ Import [`easygraphql-load-tester`](https://github.com/EasyGraphQL/easygraphql-load-tester) package.
+ Read the schema.
+ Initialize the tester, and pass the schema as the first argument.
  + If there are multiples schemas pass an array with the schemas an argument.
  + **Note**: In order to use multiples schema files, the queries and mutations must be extended.  + 
+ The second argument is the arguments on the queries, **only** if there are some of them.
  + **Note**: If an argument is an array it should be passed as an `string`, e.g: `'["name", "name 2"]'`


### One schema file
```js
'use strict' 

const EasyGraphQLLoadTester = require('easygraphql-load-tester')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')

const loadTester = new EasyGraphQLLoadTester(userSchema)
```

### Multiples schemas files
```js
'use strict' 

const EasyGraphQLLoadTester = require('easygraphql-load-tester')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

const loadTester = new EasyGraphQLLoadTester([userSchema, familySchema])
```

## Artillery

To use with [artillery](https://artillery.io), you must have it installed, in case you don't have it
just run:

```shell
$ npm install artillery -g
```

### index.js
You should configure your `index.js` file:

```js
'use strict' 

const EasyGraphQLLoadTester = require('easygraphql-load-tester')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')


const args = {
  getMeByTestResult: {
    result: 4
  },
  search: {
    id: '1'
  }
}

const loadTester = new EasyGraphQLLoadTester([userSchema, familySchema], args)

const testCases = loadTester.artillery()

module.exports = {
  testCases
}
```

#### Custom queries
You can pass custom queries to test on your load test, to do it, you must create an
array of objects:

```js
const queries = [
  {
    name: '<NAME_OF_QUERY_TO_TEST>',
    query: '<YOUR_CUSTOM_QUERY>'
  }
]

```

and then pass it as the first argument to `loadTester.artillery(queries)`.
**Note**: Write the query with the arguments, also, don't forget to write them on
the query arguments object so the other queries can access them.

##### Example:

```js
const queries = [
  {
    name: 'searchUser(id: "1")',
    query: `
      {
        searchUser(id: "1") {
          name
        }
      }
    `
  }
]

const testCases = automaticEGQL.artillery(queries)
```

### artillery.yml
The artillery file should have this minimum configuration, you can add yours in case it is needed:

```yml
config:
    target: "http://localhost:5000/"
    phases:
      - duration: 5
        arrivalRate: 1
    processor: "./index.js"
  scenarios:
    - name: "GraphQL Query load test"
      flow:
        - function: "testCases"
        - loop:
            - post:
                url: "/"
                json:
                  query: "{{ $loopElement.query }}"
            - log: "----------------------------------"
            - log: "Sent a request to the Query: {{ $loopElement.name }}"
          over: cases
```
*In this case the server is running on http://localhost:5000/*

### How to run it

To run your load test, just run:

```shell
$ artillery run artillery.yml
```

### Result

The result is going to be something like this if you apply the basic configuration
```shell
 All virtual users finished
 Summary report @ 15:03:05(-0500) 2018-11-17
   Scenarios launched:  5
   Scenarios completed: 5
   Requests completed:  40
   RPS sent: 8.95
   Request latency:
     min: 1.2
     max: 13
     median: 2
     p95: 6
     p99: 13
   Scenario counts:
     GraphQL Query load test: 5 (100%)
   Codes:
     200: 40
```