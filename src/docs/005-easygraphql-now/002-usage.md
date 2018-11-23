---
title: Usage
---

[`easygraphql-now`](https://github.com/EasyGraphQL/easygraphql-now) can be used on two ways; the first
one is going to be deploying with [now ▲](https://zeit.co/now), and the second one is going
to be running it locally

## How to use it?

Run on your terminal

```shell
$ easygraphql-now
```
**Note**: You must be on the folder where your schema is or pass the route on the terminal, 
then it'll display the possible schemas to deploy.

## Deploy with Now ▲

+ Visit the directory with the schema to deploy or pass the schema route.
+ Be sure you have already set up [now ▲](https://zeit.co/now).
+ Run `$ easygraphql-now`.
+ Select the schema file.
+ It will create the server and deploy with [now ▲](https://zeit.co/now), after that you will get a url with your GraphQL server;
  it'll be copied to your clipboard.

## Run locally

+ Visit the directory with the schema to deploy or pass the schema route.
+ Run `$ easygraphql-now --local -p=8000`.
  + Add -p=<PORT> if you want to change the port, by default is 8000.
+ Select the schema file.
+ after that you will get a url with your GraphQL server; it'll be copied to your clipboard.
+ 