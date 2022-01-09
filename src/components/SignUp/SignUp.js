import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { SignForm, CustomInputWithState } from 'components';
import { handleSignUpWithEmail } from 'api/fireBaseApi';

export const SignUp = () => {
  const { i18n } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', rePassword: '' });

  const handleChangeFormData = target => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyPress = e => {
    if (e?.key === 'Enter') {
      const { name, value } = e.target;
      handleSignUpWithEmail({ ...formData, [name]: value }, i18n.language);
    }
  };

  const handleSignUp = () => handleSignUpWithEmail(formData, i18n.language);

  return (
    <SignForm handleAuth={handleSignUp} lng={i18n.language}>
      <CustomInputWithState label="Username" name="name" onBlur={target => handleChangeFormData(target)} handleKeyPress={handleKeyPress} />
      <CustomInputWithState label="Email" name="email" onBlur={target => handleChangeFormData(target)} handleKeyPress={handleKeyPress} />
      <CustomInputWithState
        label="Password"
        name="password"
        onBlur={target => handleChangeFormData(target)}
        handleKeyPress={handleKeyPress}
      />
      <CustomInputWithState
        label="Repeat password"
        name="rePassword"
        onBlur={target => handleChangeFormData(target)}
        handleKeyPress={handleKeyPress}
      />
    </SignForm>
  );
};
