import logo from '../../resourse/images/logo.svg';
import { CustomButton } from 'components';
import { useHistory } from 'react-router';
import { signIn } from 'api/signIn';
import { fb } from 'service';
import './SignForm.css';

export const SignForm = ({ children, isSigningIn = false }) => {
  const history = useHistory();

  const handleSingIn = () => {
    signIn(fb.auth);
  };

  const handleSingInClick = () => {
    isSigningIn ? console.log('login') : history.push('/login');
  };

  const handleSingUpClick = () => {
    isSigningIn ? history.push('/signup') : console.log('sign up');
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
        <CustomButton outlined className="google-sign-in-button" label="Sign in using your Google account" onClick={handleSingIn} />
      </div>
    </div>
  );
};
