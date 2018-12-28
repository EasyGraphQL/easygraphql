---
title: Usage
---

[`easygraphql-mock`](https://github.com/EasyGraphQL/easygraphql-mock) will need a basic configuration
in order to use it.

## How to use it?

+ Import [`easygraphql-mock`](https://github.com/EasyGraphQL/easygraphql-mock) package.
+ Read the schema.
+ Initialize the mock, and pass the schema as the first argument.
  + If there are multiples schemas pass an array with the schemas an argument.
  + **Note**: In order to use multiples schema files, the queries and mutations must be extended.
+ The second argument is optional and it is going to be your custom schema, in case you want to pass it.

*In case you have a custom scalar, set it on the second argument, if it's not set it will be {}*

### One schema file
```js
'use strict' 

const easygraphqlMock = require('easygraphql-mock')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')

const mockedSchema = easygraphqlMock(userSchema)
```

### Multiples schemas files
```js
'use strict' 

const easygraphqlMock = require('easygraphql-mock')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

const mockedSchema = easygraphqlMock([userSchema, familySchema])
```

### Custom schema
You can set some values to the fields that you want on the schema. To do that, you might pass an object as a second argument. 
It must have the same name of the type and the field that you want to set.

```js
'use strict' 

const easygraphqlMock = require('easygraphql-mock')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

const mockedSchema = easygraphqlMock([userSchema, familySchema], {
  CustomScalarDate: '2018-10-10',
  Family: {
    name: 'Super test 1',
    ages: [10],
    familyRelation: 'Mother',
    familyRelationArr: ['Mother', 'Brother']
  }
})
```

### Result
Here is the result of `mockedSchema.Family`

```js
{ 
  name: 'Super test 1',
  ages: [ 10 ],
  createdAt: '2018-10-10',
  user: { 
    email: 'ulalilid@herem.gl',
    username: 'tNfwN',
    fullName: 'Nathan Lewis',
    phone: '(231) 616-1744',
    family: { 
      name: 'Super test 1',
      ages: [ 10 ],
      user: { 
        email: 'ulalilid@herem.gl',
        username: 'tNfwN',
        fullName: 'Nathan Lewis',
        phone: '(231) 616-1744',
        family: ...
      },
      familyRelation: 'Mother',
      familyRelationArr: [ 'Mother', 'Brother' ] 
    }
  },
  familyRelation: 'Mother',
  familyRelationArr: [ 'Mother', 'Brother' ] 
}
```