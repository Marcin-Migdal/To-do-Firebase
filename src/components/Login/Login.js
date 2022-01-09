import { useState } from 'react';

import { CustomInputWithState, SignForm } from 'components';
import { handleSignInWithEmail } from 'api/fireBaseApi';

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChangeFormData = target => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyPress = e => {
    if (e?.key === 'Enter') {
      const { name, value } = e.target;
      handleSignInWithEmail({ ...formData, [name]: value });
    }
  };

  const handleSignIn = () => handleSignInWithEmail(formData);

  return (
    <SignForm formData={formData} handleAuth={handleSignIn}>
      <CustomInputWithState label="Email" name="email" onBlur={target => handleChangeFormData(target)} handleKeyPress={handleKeyPress} />
      <CustomInputWithState
        label="Password"
        name="password"
        onBlur={target => handleChangeFormData(target)}
        handleKeyPress={handleKeyPress}
      />
    </SignForm>
  );
};
