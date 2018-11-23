---
title: Usage
---

[`easygraphql-parser`](https://github.com/EasyGraphQL/easygraphql-parser) will need a basic configuration
in order to use it.

## How to use it?

+ Import [`easygraphql-parser`](https://github.com/EasyGraphQL/easygraphql-parser) package.
+ Read the schema.
+ Initialize the parser, and pass the schema as the first argument.
  + If there are multiples schemas pass an array with the schemas an argument.
  + **Note**: In order to use multiples schema files, the queries and mutations must be extended.


### One schema file
```js
'use strict' 

const easygraphqlParser = require('easygraphql-parser')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')

const parsedSchema = easygraphqlParser(userSchema)
```

### Multiples schemas files
```js
'use strict' 

const easygraphqlParser = require('easygraphql-parser')
const fs = require('fs')
const path = require('path')

const userSchema = fs.readFileSync(path.join(__dirname, 'schema', 'user.gql'), 'utf8')
const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

const parsedSchema = easygraphqlParser([userSchema, familySchema])
```

## Result
The result of the parsed schema will be an object where the keys are the names of the types
and each type will have a series of properties:

+ type: GraphQL type.
+ description: The description set on the schema.
+ fields: If it is a type, it will have an array of the fields and it will have:
  + name: Field name.
  + arguments: If it is a query that receives arguments.
  + noNull: If the field can be null.
  + isArray: If the field type can be an array.
  + type: The type of data on the field.
+ values: If it is an enum, it will have the values of it.
+ types: If it is a union, it will have the types of the union.

## Example

Using the next files

### family.gql
```graphql
type Family {
  name: String!
  ages: [Int]!
}

type Query {
  getFamily: Family
}
```

### parser.js
```js
'use strict' 

const easygraphqlParser = require('easygraphql-parser')
const fs = require('fs')
const path = require('path')

const familySchema = fs.readFileSync(path.join(__dirname, 'schema', 'family.gql'), 'utf8')

const parsedSchema = easygraphqlParser(familySchema)
```

### Result of the parsed schema
```js
{ 
  Family: { 
    type: 'ObjectType',
    description: undefined,
    fields: [ 
      { 
        name: 'name',
        arguments: [],
        noNull: true,
        isArray: false,
        type: 'String' 
      },
      { 
        name: 'ages',
        arguments: [],
        noNull: true,
        isArray: true,
        type: 'Int' 
      } 
    ],
    values: [],
    types: []
  },
  Query: { 
    type: 'ObjectType',
    description: undefined,
    fields:  [ 
      { 
        name: 'getFamily',
        arguments: [],
        noNull: false,
        isArray: false,
        type: 'Family' 
      } 
    ],
    values: [],
    types: []
  } 
}
```