import { CustomInputWithState, SignForm } from 'components';

export const Login = () => {
  return (
    <SignForm isSigningIn>
      <CustomInputWithState label="Username" name="name" />
      <CustomInputWithState label="Password" name="password" />
    </SignForm>
  );
};
