import { useState } from 'react';

import { CustomInputFloatingLabel, SignForm } from 'components';
import { signInWithEmail } from 'api/userApi';
import { validateValue } from 'helpers/validateValue';
import { validateSignIn } from 'helpers/validateAuth';
import { validationSchema } from './formikConfig';
import { useToDo } from 'context';

export const SignIn = () => {
  const { showToast } = useToDo();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState();

  const handleChangeFormData = async e => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    validateValue(e.target, validationSchema, errors, e => setErrors(e), formData?.password);
  };

  const handleKeyPress = e => {
    if (e?.key === 'Enter') {
      const { name, value } = e.target;
      handleSignIn({ ...formData, [name]: value });
    }
  };

  const handleSignIn = async (_formData = formData) => {
    const errors = await validateSignIn(Object.keys(formData), _formData, validationSchema);
    setErrors(errors);

    !errors && signInWithEmail(_formData, handleSignInError);
  };

  const handleSignInError = (name, message) => {
    if (name === 'internal') {
      showToast('Error', message, 'error');
      return;
    }
    setErrors({ ...errors, [name]: message });
  };

  return (
    <SignForm formData={formData} handleAuth={handleSignIn} disableForm={!!errors || !formData}>
      <CustomInputFloatingLabel
        error={errors?.email}
        label="Email"
        name="email"
        onBlur={handleChangeFormData}
        handleKeyPress={handleKeyPress}
      />
      <CustomInputFloatingLabel
        error={errors?.password}
        label="Password"
        name="password"
        type="password"
        onBlur={handleChangeFormData}
        handleKeyPress={handleKeyPress}
      />
    </SignForm>
  );
};
