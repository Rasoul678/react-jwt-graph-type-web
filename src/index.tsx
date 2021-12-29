import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { ChakraProvider } from "@chakra-ui/react";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { httpLink, requestLink, tokenRefreshLink } from "./apolloLinks";
import App from "./App";

const cache = new InMemoryCache({});

const client = new ApolloClient({
  link: ApolloLink.from([
    tokenRefreshLink,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log(graphQLErrors);
      }
      if (networkError) {
        // logoutUser();
        console.log(networkError);
      }
    }),
    requestLink,
    httpLink,
  ]),
  cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client as any}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
