import React from 'react';
import ReactDOM from 'react-dom';
import Books from './Books';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Books />
  </ApolloProvider>,
  document.getElementById('root')
);
