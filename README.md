# Sample Angular Application with Keycloak 
This is a sample POC tested with Keycloak using authorization-code grant. 

## Dependency
https://www.npmjs.com/package/keycloak-angular 

## Configuration
All the configurations are hard coded and can be found in module (app.module.ts)

## Description
- This application has logut with `id_token_hint` and `post_logout_redirect_uri`. 
- Executes a rest api `User Info Endpoint` and prints the output in the console. 