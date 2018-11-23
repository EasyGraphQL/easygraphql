---
title: Usage
---

[`easygraphql-format-error`](https://github.com/EasyGraphQL/easygraphql-format-error) will need a basic configuration
in order to use it.

It can be used with custom errors.

## How to use it?

+ Import [`easygraphql-format-error`](https://github.com/EasyGraphQL/easygraphql-format-error) package.
+ Initialize EasygraphqlFormatError
  + If you want to create custom errors, pass an array of objects as the first argument.
  + The custom errors must be an array of objects with the next structure:
      ```js
      {
        name: '<YOUR_ERROR_NAME>',
        message: '<YOUR_ERROR_MESSAGE>',
        statusCode: '<YOUR_ERROR_CODE>'
      }
      ```
+ Pass the error name `const errorName = formatError.errorName` on the context, so, you
  can access the errors on the resolvers.

## Example: Without custom errors
In order to use it without custom errors, this should be the setup

### App.js
**Note**: In this case, it will only focus on the necessary configuration and no in
the whole `App.js` file.

```js
const EasygraphqlFormatError = require('easygraphql-format-error')

// ...

const formatError = new EasygraphqlFormatError()
const errorName = formatError.errorName

app.use('/graphql', (req, res) => {
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
    context: { errorName },
    formatError: (err) => {
      return formatError.getError(err)
    }
  })(req, res)
})
```

### Resolvers
**Note**: In this case, it will only focus on the necessary configuration and no in
the whole resolver file.

```js
userInformation: (_, { isLoggedIn }, { errorName }) => {
  if (!isLoggedIn) {
    throw new Error(errorName.UNAUTHORIZED)
  }

  return 'My username'
}
```

### Result
If the user is not logged in, this will be the response

```shell
{
  "errors": [
    {
      "message": "Unauthorized",
      "statusCode": 401
    }
  ],
  "data": null
}
```

## Example: With custom errors
You can create your own custom errors and then access to them from the resolver, 
calling `errorName.YOUR_ERROR_NAME`.

The custom errors must be an array of objects with the next structure:

```js
{
  name: '<YOUR_ERROR_NAME>',
  message: '<YOUR_ERROR_MESSAGE>',
  statusCode: '<YOUR_ERROR_CODE>'
}
```

### App.js
**Note**: In this case, it will only focus on the necessary configuration and no in
the whole `App.js` file.

```js
const EasygraphqlFormatError = require('easygraphql-format-error')

// ...

const formatError = new EasygraphqlFormatError([{
  name: 'INVALID_EMAIL',
  message: 'The email is not valid',
  statusCode: '400'
}])
const errorName = formatError.errorName

app.use('/graphql', (req, res) => {
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
    context: { errorName },
    formatError: (err) => {
      return formatError.getError(err)
    }
  })(req, res)
})
```

### Resolvers
**Note**: In this case, it will only focus on the necessary configuration and no in
the whole resolver file.

```js
findUserByEmail: ({ email }, { errorName }) => {
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    throw new Error(errorName.INVALID_EMAIL)
  }

  return email
}
```

### Result
If the email is not valid, this will be the response

```shell
{
  "errors": [
    {
      "message": "The email is not valid",
      "statusCode": "400"
    }
  ],
  "data": null
}
```