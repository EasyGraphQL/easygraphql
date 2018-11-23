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

+ Define a Query or Mutation to test.
+ Pass as first argument, the query/mutation to mock to `.mock(query/mutation)`.
+ The second argument is required **if it is a mutation**, it must be an object with the fields of the input


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
const userQueryMock = tester.mock(query)

const mutation = `
  mutation CreateUser {
    id
    name
  }
`
const userMutationMock = tester.mock(mutation, {
  name: 'test'
})

```

### Mock result
```js
// userQueryMock
{ 
  id: '93',
  name: 'Tony Patrick',
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

// userMutationMock
{
  id: '93',
  name: 'Tony Patrick'
}
```
