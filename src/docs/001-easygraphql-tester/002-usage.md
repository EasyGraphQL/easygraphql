---
title: Usage
---

[`easygraphql-tester`](https://github.com/EasyGraphQL/easygraphql-tester) can be used in two ways; the first one is using `.tester` as an assertion of the query/mutation, and the second one is using `.mock` to return the mocked query/mutation.

## How to use it?

+ Import [`easygraphql-tester`](https://github.com/EasyGraphQL/easygraphql-tester) package.
+ Read the schema.
+ Initialize the tester, and pass the schema as an argument.
  + If there are multiples schemas pass an array with the schemas an argument.
  + **Note**: In order to use multiples schema files, the queries and mutations must be extended.


### One schema file
```js
'use strict' 

const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')

const tester = new EasyGraphQLTester(userSchema)
```

### Multiples schemas files
```js
'use strict' 

const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

const tester = new EasyGraphQLTester([userSchema, familySchema])
```

## Assertion

[`easygraphql-tester`](https://github.com/EasyGraphQL/easygraphql-tester) works as an assertion library used to make tests **with your favorite test runner**.

To use it as an assertion library, you must follow the next steps:

+ Define a Query or Mutation to test.
+ Pass as first argument, a boolean to `.test(true)` or `.test(false)`.
  + true: if it is fine, everything should work fine.
  + false: if it should fail, there is an error or invalid field on the query/mutation or arguments/input.
+ Pass as second argument, the query/mutation to test.
+ The third argument is required **if it is a mutation**, it must be an object with the fields of the input

The next example is going to be made with mocha, but it can be done **with your favorite test runner**. 

### Mocha example
```js
'use strict'

const fs = require('fs')
const path = require('path')
const EasyGraphQLTester = require('../lib')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

describe('Test my queries and mutations', () => {
  let tester

  before(() => {
    tester = new EasyGraphQLTester([userSchema, familySchema])
  })

  describe('Should pass if the query is invalid', () => {
    it('Invalid query getUser', () => {
      const invalidQuery = `
        {
          getUser {
            id
            invalidField
            familyInfo {
              father {
                email
                username
              }
            }
          }
        }
      `
      // First arg: false, there is no invalidField on the schema.
      tester.test(false, invalidQuery)
    })

    it('Should pass if the query is valid', () => {
      const validQuery = `
        {
          getMeByTestResult(result: 4.9) {
            email
          }
        }
      `
      tester.test(true, validQuery)
    })

    it('Should pass if the mutation is valid', () => {
      const mutation = `
        mutation UpdateUserScores {
          updateUserScores {
            email
            scores
          }
        }
      `
      tester.test(true, mutation, {
        scores: [1, 2, 3]
      })
    })

    it('Should not pass if one value on the mutation input is invalid', () => {
      const mutation = `
        mutation UpdateUserScores {
          updateUserScores {
            email
            scores
          }
        }
      `
      // First arg: false, there is no invalidField on the schema.
      tester.test(false, mutation, {
        scores: [1],
        invalidField: true
      })
    })

    it('Should search', () => {
      const query = `
        {
          search(id: "1") {
            ... on User {
              id
            }
            ... on FamilyInfo {
              id
              father {
                username
              }
              brothers {
                username
              }
            }
          }
        }
      `

      tester.test(true, query)
    })
  })
})
```

## Mocking Queries and Mutations

[`easygraphql-tester`](https://github.com/EasyGraphQL/easygraphql-tester) can works as a mocker of your query or mutation, using it is simple.

Call the method `.mock()` and pass an object with this options:

+ query: It'll be the query/mutation to test.
+ variables: This is required **if it is a mutation**, it must be an object with the fields of the input.
+ fixture: This is optional and it is if you want to pass your custom fixtures.
+ saveFixture: By default is `false`, if you pass fixtures, and set it to `true` when you make the same query again,
  it will return the fixture value.

The result will have top level fields, it means that the result will be an object
with a property that is going to be the name (top level field) of the query or alias with the mocked
result.

### Mock example
```js
'use strict'

const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

const tester = new EasyGraphQLTester([userSchema, familySchema])

const query = `
  {
    getUser(id: "1") {
      id
      name
      familyInfo {
        lastName
        email
      }
    }
  }
`

const fixture = {
  id: '1',
  name: 'EasyGraphQL'
}

const { getUser } = tester.mock({ query, fixture })

const queryWithAlias = `
  {
    firstUser: getUser(id: "1") {
      id
    }
  }
`
const { firstUser } = tester.mock({ query: queryWithAlias })


const mutation = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`
const input = {
  name: 'test'
}

const { createUser } = tester.mock({ query: mutation, variables: input })
```

### Mock result
```js
// getUser
{ 
  id: '1',
  name: 'EasyGraphQL',
  familyInfo: [
    { 
      lastName: 'Bartoletti',
      email: 'YSjsYuV@wtnK.com'
    },
    { 
      lastName: 'Bartoletti',
      email: 'YSjsYuV@wtnK.com'
    },
    { 
      lastName: 'Bartoletti',
      email: 'YSjsYuV@wtnK.com'
    }
  ]
}

//firstUser
{
  id: '93'
}


// createUser
{
  id: '93',
  name: 'Tony Patrick'
}
```
