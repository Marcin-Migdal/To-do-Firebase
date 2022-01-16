import { useHistory } from 'react-router';
import { useState } from 'react';

import { handleGoogleSingIn } from 'api/fireBaseApi';
import logo from '../../resourse/images/logo.svg';
import { CustomButton } from 'components';
import { pages } from 'utils/pagesUrl';

import './SignForm.css';

export const SignForm = ({ children, handleAuth, lng, disableForm = false }) => {
  const history = useHistory();
  const [isSigningIn] = useState(window.location.pathname.match(pages.signIn));

  const handleSingInClick = () => {
    isSigningIn ? handleAuth() : history.push(pages.signIn);
  };

  const handleSingUpClick = () => {
    !isSigningIn ? handleAuth() : history.push(pages.signup);
  };

  return (
    <div className="sign-form-layout">
      <img className="image" src={logo} alt="Logo" />
      <div className="form-container">
        {children}
        <div className="form-buttons-container">
          <CustomButton
            disabled={isSigningIn && disableForm}
            outlined={!isSigningIn}
            className="sign-form-button"
            label="Sign ip"
            onClick={handleSingInClick}
          />
          <CustomButton
            disabled={!isSigningIn && disableForm}
            outlined={isSigningIn}
            className="sign-form-button"
            label="Sign up"
            onClick={handleSingUpClick}
          />
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
