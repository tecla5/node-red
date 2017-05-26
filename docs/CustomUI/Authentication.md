# Authentication

node-red seems to come with some kind of (basic) Authentication built in as per
`red/api/auth` folder.

## Auth0 with GraphCool

You create Auth0 account, then configure GraphCool app, then in your app, you use Auth0Lock to login, then reuse the same token to login to GraphCool app and store token in localstorage, then use Apollo middleware to send it on each request as BEARER token

Started work in `red/api/auth/auth0`