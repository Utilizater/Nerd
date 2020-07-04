import React from 'react';
import Game from './routes/game';
import Dictionary from './routes/dictionary';
import Settings from './routes/settings';
import Header from './components/Header';
import Default from './components/Default';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AuthContext } from './auth';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <AuthContext.Provider value={true}>
      <Router>
        <Header />
        <Route path="/" exact component={Default} />
        <PrivateRoute path="/dictionary" component={Dictionary} />
        <PrivateRoute path="/settings" component={Settings} />
        <PrivateRoute path="/game" component={Game} />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
