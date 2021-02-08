# Simplejs

## Description
This project is for POC to confirm how to use the `graphql-middleware` and `graphql-shield` for authentication in our project.

## How to run this project?
1. Get AccessToke
- open [pivotate-backend-url](https://osc6oeg32a.execute-api.us-east-1.amazonaws.com/dev/graphql)
- run following query
```
mutation Excute($actionId: ID!, $executionParameters: String, $unrestricted:Boolean){
  execute(actionId:$actionId, executionParameters: $executionParameters, unrestricted:$unrestricted)
}
```
2. Run simplejs app
- run project
```
$ npm run start
```
- Add `AccessToken` into `HTTP HEADERS` in graphql playground
```
{
  "Authorization": "******"
}
```
- run query
