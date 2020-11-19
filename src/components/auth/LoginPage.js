import React from 'react';
import ReactDOM from 'react-dom';
import T from 'prop-types';

import Button from '../shared/Button';
import FormField from '../shared/FormField';
import { login } from '../../api/auth';

import './LoginPage.css';

function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) {
      // for <style> elements
      const newStyleEl = sourceDoc.createElement('style');

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) {
      // for <link> elements loading CSS from a URL
      const newLinkEl = sourceDoc.createElement('link');

      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}
class LoginPage extends React.Component {
  state = {
    form: {
      email: '',
      password: '',
    },
    submitting: false,
    error: null,
  };

  containerEl = document.createElement('div');
  externalWindow = null;

  handleChange = event => {
    this.setState(state => ({
      form: { ...state.form, [event.target.name]: event.target.value },
    }));
  };

  handleSubmit = async event => {
    const { onLogin, history } = this.props;
    const { form: crendentials } = this.state;
    event.preventDefault();
    this.setState({ submitting: true });
    try {
      const loggedUserId = await login(crendentials);
      this.setState({ submitting: false, error: null });
      onLogin(loggedUserId, () => history.push('/tweet'));
    } catch (error) {
      this.setState({ submitting: false, error });
    }
  };

  componentDidMount() {
    this.externalWindow = window.open(
      '',
      '',
      'width=600,height=400,left=200,top=200'
    );
    this.externalWindow.document.body.appendChild(this.containerEl);
    copyStyles(document, this.externalWindow.document);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.externalWindow.close();
  }

  canSubmit = () => {
    const {
      form: { email, password },
      submitting,
    } = this.state;
    return !submitting && email && password;
  };

  render() {
    const {
      form: { email, password },
      error,
    } = this.state;

    return ReactDOM.createPortal(
      <div className="loginPage">
        <h1 className="loginPage-title">Log in to Twitter</h1>
        <form onSubmit={this.handleSubmit}>
          <FormField
            type="text"
            name="email"
            label="phone, email or username"
            className="loginPage-field"
            value={email}
            onChange={this.handleChange}
          />
          <FormField
            type="password"
            name="password"
            label="password"
            className="loginPage-field"
            value={password}
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            className="loginPage-submit"
            variant="primary"
            disabled={!this.canSubmit()}
          >
            Log in
          </Button>
        </form>
        {error && <div className="loginPage-error">{error.message}</div>}
      </div>,
      this.containerEl
    );
  }
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
};

export default LoginPage;
