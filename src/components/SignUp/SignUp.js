import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { validateSignUp } from 'helpers/validateAuth';
import { SignForm, CustomInputWithState } from 'components';
import { handleSignUpWithEmail } from 'api/fireBaseApi';
import { validationSchema } from './formikConfig';
import { useToDo } from 'context';
import { validateValue } from 'helpers/validateValue';

export const SignUp = () => {
  const { showToast } = useToDo();
  const { i18n } = useTranslation();
  const [formData, setFormData] = useState({ userName: '', email: '', password: '', verifyPassword: '' });
  const [errors, setErrors] = useState();

  const handleChangeFormData = async target => {
    const { name, value } = target;

    setFormData({ ...formData, [name]: value });
    validateValue(target, validationSchema, errors, e => setErrors(e), formData?.password);
  };

  const handleKeyPress = e => {
    if (e?.key === 'Enter') {
      const { name, value } = e.target;
      handleSignUp({ ...formData, [name]: value });
    }
  };

  const handleSignUp = async (_formData = formData) => {
    const errors = await validateSignUp(Object.keys(formData), _formData, validationSchema);
    setErrors(errors);

    !errors && handleSignUpWithEmail(_formData, i18n.language, handleSignUpError);
  };

  const handleSignUpError = (name, message) => {
    if (name === 'internal') {
      showToast('Error', message, 'error');
      return;
    }
    setErrors({ ...errors, [name]: message });
  };

  return (
    <SignForm handleAuth={handleSignUp} lng={i18n.language} disableForm={!!errors}>
      <CustomInputWithState
        error={errors?.userName}
        label="Username"
        name="userName"
        onBlur={target => handleChangeFormData(target)}
        handleKeyPress={handleKeyPress}
      />
      <CustomInputWithState
        error={errors?.email}
        label="Email"
        name="email"
        onBlur={target => handleChangeFormData(target)}
        handleKeyPress={handleKeyPress}
      />
      <CustomInputWithState
        error={errors?.password}
        label="Password"
        name="password"
        type="password"
        onBlur={target => handleChangeFormData(target)}
        handleKeyPress={handleKeyPress}
      />
      <CustomInputWithState
        error={errors?.verifyPassword}
        label="Repeat password"
        name="verifyPassword"
        type="password"
        onBlur={target => handleChangeFormData(target)}
        handleKeyPress={handleKeyPress}
      />
    </SignForm>
  );
};
