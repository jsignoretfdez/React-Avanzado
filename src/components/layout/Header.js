import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { logout } from '../../api/auth';
import { ReactComponent as Icon } from '../../assets/twitter.svg';
import './Header.css';
import Button from '../shared/Button';
import { useAuthContext } from '../auth/context';

const Header = ({ className, ...props }) => {
  const { loggedUserId, onLogout } = useAuthContext();

  return (
    <header className={classNames('header', className)} {...props}>
      <Link to="/">
        <div className="header-logo">
          <Icon width="32" height="32" />
        </div>
      </Link>
      <nav className="header-nav">
        <Button
          as={Link}
          to="/tweet"
          variant="primary"
          className="header-button"
        >
          Tweet
        </Button>
        {loggedUserId ? (
          <Button
            className="header-button"
            onClick={() => logout().then(onLogout)}
          >
            Log out
          </Button>
        ) : (
          <Button as={Link} to="/login" className="header-button">
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
