import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import View from './View';

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/swapi',
});

const App = () => (
  <ApolloProvider client={client}>
    <View></View>
  </ApolloProvider>
);

export default App;
