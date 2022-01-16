import { useState } from 'react';

import { CustomInputWithState, SignForm } from 'components';
import { handleSignInWithEmail } from 'api/fireBaseApi';
import { validateSignIn } from 'helpers/validateAuth';
import { validationSchema } from './formikConfig';
import { useToDo } from 'context';
import { validateValue } from 'helpers/validateValue';

export const SignIn = () => {
  const { showToast } = useToDo();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState();

  const handleChangeFormData = async target => {
    const { name, value } = target;

    setFormData({ ...formData, [name]: value });
    validateValue(target, validationSchema, errors, e => setErrors(e), formData?.password);
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

    !errors && handleSignInWithEmail(_formData, handleSignInError);
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
    </SignForm>
  );
};
