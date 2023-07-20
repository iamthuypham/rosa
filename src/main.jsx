import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
);
