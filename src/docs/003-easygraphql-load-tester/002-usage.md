---
title: Usage
---

[`easygraphql-load-tester`](https://github.com/EasyGraphQL/easygraphql-load-tester) can be used in three ways for the moment:

1. Using `.artillery()` with a [artillery](https://artillery.io) setup.
2. Using `.k6()` with a [k6](https://docs.k6.io/docs) setup.
3. Using `.createQuery()` that'll create the queries, so you can use with your favorite load tester.


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

### Using GraphQL.js
```js
'use strict'

const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const EasyGraphQLTester = require('easygraphql-load-tester')

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

const loadTester = new EasyGraphQLLoadTester(schema)
```

## Artillery

To use with [artillery](https://artillery.io), you must have it installed in your project, 
in case you don't have it just run:

```shell
$ npm install artillery --saved-dev
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
  },
  ,
  searchUser: {
    where: {
      id: '1',
      name: 'demo'
    }
  },
  createUser: {
    input: {
      name: 'demo'
    }
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
array of objects, and then pass it on the options argument:

```js
const queries = [
  {
    name: '<NAME_OF_QUERY_TO_TEST>',
    query: '<YOUR_CUSTOM_QUERY>'
  }
]

```

#### Selected queries
You can select a list of the queries you want to test, to do this, you must create an
array of strings with the name of the queries to test; this is optional, if you don't
create it, all the queries are going to be tested.

```js
const selectedQueries = ['getFamilyInfo', 'searchUser']
```

#### Query file
You can select, if you want to save a `json` file with all the queries that where tested,
to do it, on the options pass `queryFile: true`, if you don't pass anything it is not going
to be saved.

#### Mutations
You can use [`easygraphql-load-tester`](https://github.com/EasyGraphQL/easygraphql-load-tester) to test
your mutations as well; to do it, on the options pass `withMutations: true`, if you don't pass anything it is only
going to test the queries.
*If you set `withMutations: true`, don't forget to add the input values on the args*

#### Options
*This is optional, you can leave the first argument empty, if you don't want to pass any options*
The artillery method will receive some options that will help to create custom queries,
and test specific queries.

```js
const options = {
  selectedQueries,
  customQueries: queries,
  queryFile: true,
  withMutations: true
}
```

and then pass it as the first argument to `loadTester.artillery(options)`.
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

const options = {
  selectedQueries: ['getFamilyInfo', 'searchUser', 'createUser'],
  customQueries: queries,
  withMutations: true
}

const testCases = easyGraphQLLoadTester.artillery(options)
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

To run your load test, add this script on your `package.json`:

```json
"scripts": {
  "easygraphql-load-tester": "artillery run artillery.yml"
}
```
and then run on the terminal

```shell
$ npm run easygraphql-load-tester
```
*In this case the artillery file is called artillery, but you can name yours with your favorite name and run `artillery run <MY_FILE_NAME>.yml`*

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

## k6

To use with [k6](https://docs.k6.io/docs/), you must have it installed on your computer, 
in case you don't have it, visit the [installation guide](https://docs.k6.io/docs/installation)

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
  },
  ,
  searchUser: {
    where: {
      id: '1',
      name: 'demo'
    }
  }
}

const loadTester = new EasyGraphQLLoadTester([userSchema, familySchema], args)

easyGraphQLLoadTester.k6(<FILE_NAME>)
```
**The first argument is the name of the k6 configuration file**

#### Custom queries
You can pass custom queries to test on your load test, to do it, you must create an
array of objects, and then pass it on the options argument:

```js
const queries = [
  {
    name: '<NAME_OF_QUERY_TO_TEST>',
    query: '<YOUR_CUSTOM_QUERY>'
  }
]

```

#### Selected queries
You can select a list of the queries you want to test, to do this, you must create an
array of strings with the name of the queries to test; this is optional, if you don't
create it, all the queries are going to be tested.

```js
const selectedQueries = ['getFamilyInfo', 'searchUser']
```

#### Query file
You can select, if you want to save a `json` file with all the queries that where tested,
to do it, on the options pass `queryFile: true`, if you don't pass anything it is not going
to be saved.

#### Mutations
You can use [`easygraphql-load-tester`](https://github.com/EasyGraphQL/easygraphql-load-tester) to test
your mutations as well; to do it, on the options pass `withMutations: true`, if you don't pass anything it is only
going to test the queries.
*If you set `withMutations: true`, don't forget to add the input values on the args*

#### Virtual users
You can select how many virtual users do you want for your tests, just pass to the options
`vus: <NUMBER_OF_VUS>`.

#### Duration
You can select the duration for your tests, just pass to the options
`duration: '<DURATION>s'`. It should be a string with units of the time e.g. `s`

#### Options
*This is optional, you can leave the second argument empty, if you don't want to pass any options*

```js
const options = {
  selectedQueries,
  customQueries: queries,
  queryFile: true,
  withMutations: true,
  vus: 10,
  duration: '10s'
}
```

and then pass it as the second argument to `loadTester.artillery(<FILE_NAME>, options)`.
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

const options = {
  selectedQueries: ['getFamilyInfo', 'searchUser'],
  queryFile: true,
  withMutations: true,
  vus: 10,
  duration: '10s'
}

easyGraphQLLoadTester.k6('k6.js', options)
```

### k6.js
The artillery file should have this minimum configuration, you can add yours in case it is needed:

**Note: dont' change the name and the route of the queries `./easygraphql-load-tester-queries.json`**

```js
import http from "k6/http";

const queries = JSON.parse(open("./easygraphql-load-tester-queries.json"));

export default function() {
  for (const query of queries) {
    const url = "http://localhost:5000/";
    const payload = JSON.stringify({ query: query.query });
    const params =  { headers: { "Content-Type": "application/json" } }
    http.post(url, payload, params);
  }
};
```
*In this case the server is running on http://localhost:5000/*

### How to run it

To run your load test, add this script on your `package.json`:

```json
"scripts": {
  "easygraphql-load-tester": "node index.js"
}
```
and then run on the terminal

```shell
$ npm run easygraphql-load-tester
```