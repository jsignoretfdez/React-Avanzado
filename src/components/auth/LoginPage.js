import React, { useState } from 'react';
import T from 'prop-types';

import Button from '../shared/Button';
import FormField from '../shared/FormField';
import { login } from '../../api/auth';

import './LoginPage.css';

function LoginPage({ onLogin, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  const handleSubmit = async event => {
    const crendentials = { email, password };
    event.preventDefault();
    setSubmitting(true);
    try {
      const loggedUserId = await login(crendentials);
      setError(null);
      onLogin(loggedUserId).then(() => history.push('/tweet'));
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = () => {
    return !submitting && email && password;
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Twitter</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="phone, email or username"
          className="loginPage-field"
          value={email}
          onChange={handleEmailChange}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginPage-field"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          type="submit"
          className="loginPage-submit"
          variant="primary"
          disabled={!canSubmit()}
        >
          Log in
        </Button>
      </form>
      {error && <div className="loginPage-error">{error.message}</div>}
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
  history: T.shape({ push: T.func.isRequired }).isRequired,
};

export default LoginPage;
