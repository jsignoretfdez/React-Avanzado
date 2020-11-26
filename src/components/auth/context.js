import React, { useContext } from 'react';

const AuthContext = React.createContext();

export const useAuthContext = () => {
  const auth = useContext(AuthContext);
  return auth;
};
export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;

export default AuthContext;
