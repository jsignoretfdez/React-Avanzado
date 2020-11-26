import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthContext } from './context';

const PrivateRoute = props => {
  const { loggedUserId } = useAuthContext();
  return loggedUserId ? <Route {...props} /> : <Redirect to="/login" />;
};
export default PrivateRoute;
