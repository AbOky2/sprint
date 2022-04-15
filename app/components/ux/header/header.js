import React from 'react';
import PropTypes from 'prop-types';
// import { Icon } from '../../../components/form/Icon';
import { Typo } from '../../../components/form/Typo';

export const Header = ({ user, onLogin, onLogout, onCreateAccount }) => (
  <header>
    <div className="flex justify-between">
      <div>
        {/* <Icon type="logo" /> */}
        <Typo type="h1">Hello</Typo>
      </div>
      <div>
        {user ? (
          <>
            <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span>
            <button size="small" onClick={onLogout} label="Log out" />
          </>
        ) : (
          <>
            <button size="small" onClick={onLogin} label="Log in" />
            <button
              primary
              size="small"
              onClick={onCreateAccount}
              label="Sign up"
            />
          </>
        )}
      </div>
    </div>
  </header>
);

Header.propTypes = {
  user: PropTypes.shape({}),
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};
