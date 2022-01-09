import { useHistory } from 'react-router';

import { handleGoogleSingIn } from 'api/fireBaseApi';
import logo from '../../resourse/images/logo.svg';
import { CustomButton } from 'components';
import './SignForm.css';
import { pages } from 'utils/pagesUrl';
import { useState } from 'react';

export const SignForm = ({ children, handleAuth, lng }) => {
  const history = useHistory();
  const [isSigningIn] = useState(window.location.pathname.match(pages.login));

  const handleSingInClick = () => {
    isSigningIn ? handleAuth() : history.push('/login');
  };

  const handleSingUpClick = () => {
    !isSigningIn ? handleAuth() : history.push('/signup');
  };

  return (
    <div className="sign-form-layout">
      <img className="image" src={logo} alt="Logo" />
      <div className="form-container">
        {children}
        <div className="form-buttons-container">
          <CustomButton outlined={!isSigningIn} className="sign-form-button" label="Login" onClick={handleSingInClick} />
          <CustomButton outlined={isSigningIn} className="sign-form-button" label="Sign up" onClick={handleSingUpClick} />
        </div>
        <CustomButton
          outlined
          className="google-sign-in-button"
          label="Sign in using your Google account"
          onClick={() => handleGoogleSingIn(lng)}
        />
      </div>
    </div>
  );
};
