import { SignForm, CustomInputWithState } from 'components';

export const SignUp = () => {
  return (
    <SignForm>
      <CustomInputWithState label="Username" name="name" />
      <CustomInputWithState label="Email" name="email" />
      <CustomInputWithState label="Password" name="password" />
      <CustomInputWithState label="Repeat password" name="rePassword" />
    </SignForm>
  );
};
