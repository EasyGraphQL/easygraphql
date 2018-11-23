---
title: Errors
---

If there is an error on the query or mutation [`easygraphql-tester`](https://github.com/EasyGraphQL/easygraphql-tester) will let you know what
is happening.

### Invalid field on query
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
    getUsers {
      email
      username
      invalidName
    }
  }
`

tester.mock(query) // Error: Query getUsers: The selected field invalidName doesn't exists
```

### Invalid arguments on query
```js
'use strict'

const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

const tester = new EasyGraphQLTester([userSchema, familySchema])

const getUserByUsername = `
  {
    getUserByUsername(invalidArg: test) {
      email
    }
  }
`

tester.mock(getUserByUsername) // Error: invalidArg argument is not defined on getUserByUsername arguments
```

### Not defined argument on query
```js
'use strict'

const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

const tester = new EasyGraphQLTester([userSchema, familySchema])

const getUserByUsername = `
  {
    getUserByUsername(username: test, name: "name test") {
      email
    }
  }
`

tester.mock(getUserByUsername) // Error: name argument is not defined on getUserByUsername arguments
```

### Missing field on input
```js
'use strict'

const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

const tester = new EasyGraphQLTester([userSchema, familySchema])

const mutation = `
  mutation CreateFamily {
    createFamily {
      lastName
    }
  }
`
const test = tester.mock(mutation, {
  lastName: 'test'
})
// Error: email argument is missing on createFamily
```

There are more errors, these ones are just some of the validations that are made.