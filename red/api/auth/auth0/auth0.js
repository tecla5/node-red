const ApolloClient, {
  createNetworkInterface
} = require('apollo-client')

const {
  ENDPOINT,
  GRAPHCOOL_TOKEN_STORAGE_KEY
} = require('./constants')

const networkInterface = createNetworkInterface({
  uri: ENDPOINT
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}; // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    req.options.headers.authorization = localStorage.getItem(GRAPHCOOL_TOKEN_STORAGE_KEY) || null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface
})

const tokens = {
  auth0Token: localStorage.getItem(AUTH0_TOKEN_STORAGE_KEY),
  graphcoolToken: localStorage.getItem(GRAPHCOOL_TOKEN_STORAGE_KEY),
}

module.exports = {
  tokens
}