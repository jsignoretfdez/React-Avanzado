import React, { useState } from 'react';
import T from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import TweetsPage from '../tweets/TweetsPage';
import TweetPage from '../tweets/TweetPage';
import LoginPage from '../auth/LoginPage';
import NewTweetPage from '../tweets/NewTweetPage';
import PrivateRoute from '../auth/PrivateRoute';
import { AuthContextProvider } from '../auth/context';

function App({ initiallyLooggedUserId }) {
  const [loggedUserId, setLoggedUserId] = useState(initiallyLooggedUserId);

  const handleLogin = loggedUserId =>
    new Promise(resolve => {
      setLoggedUserId(loggedUserId);
      resolve();
    });
  const handleLogout = () => setLoggedUserId(null);

  return (
    <AuthContextProvider
      value={{
        isLogged: !!loggedUserId,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      <div className="App">
        <Switch>
          <Route path="/" exact>
            {({ history }) => <TweetsPage history={history} />}
          </Route>
          <PrivateRoute path="/tweet" exact>
            <NewTweetPage />
          </PrivateRoute>
          <Route path="/tweet/:tweetId" exact component={TweetPage} />
          <Route path="/login" exact>
            {({ history }) => (
              <LoginPage onLogin={handleLogin} history={history} />
            )}
          </Route>
          <Route path="/404" exact>
            <div
              style={{
                textAlign: 'center',
                fontSize: 48,
                fontWeight: 'bold',
              }}
            >
              404 | Not found page
            </div>
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    </AuthContextProvider>
  );
}

App.propTypes = {
  initiallyLooggedUserId: T.string,
};

export default App;
