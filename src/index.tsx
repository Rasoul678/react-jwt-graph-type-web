import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ChakraProvider } from "@chakra-ui/react";
import AppRoutes from "./Routes";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: 'include',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client as any}>
      <ChakraProvider>
        <AppRoutes />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
