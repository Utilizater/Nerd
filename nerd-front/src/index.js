import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import App from './App';
import client from './ApolloClient';
import { ApolloProvider } from '@apollo/react-hooks';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#584b4f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#353334',
      contrastText: '#fff',
    },
    secondaryText: '#bdbdbd',
    text: {
      primary: '#efeae1',
      secondary: '#efdab9',
    },
  },
});

ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ApolloProvider>
  </React.Fragment>,
  document.getElementById('root'),
);
