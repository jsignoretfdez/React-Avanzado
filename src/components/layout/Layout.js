import React from 'react';
import T from 'prop-types';

import Header from './Header';
import './Layout.css';

function Layout({ children, title }) {
  return (
    <div className="layout">
      <Header className="layout-header bordered" />
      <main className="layout-main bordered">
        <h2 className="layout-title bordered">{title}</h2>
        <section className="layout-content">{children}</section>
      </main>
      <footer className="layout-footer bordered">© 2020 Keepcoding</footer>
    </div>
  );
}

Layout.propTypes = {
  children: T.node,
  title: T.string.isRequired,
};

export default Layout;
