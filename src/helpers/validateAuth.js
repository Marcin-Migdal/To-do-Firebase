export const validateSignIn = async (keys, _formData, validationSchema) => {
  let _errors;
  _errors = await validateSingleField(keys[0], _formData, _errors, validationSchema);
  _errors = await validateSingleField(keys[1], _formData, _errors, validationSchema);

  return _errors;
};

export const validateSignUp = async (keys, _formData, validationSchema) => {
  let _errors;
  _errors = await validateSingleField(keys[0], _formData, _errors, validationSchema);
  _errors = await validateSingleField(keys[1], _formData, _errors, validationSchema);
  _errors = await validateSingleField(keys[2], _formData, _errors, validationSchema);
  _errors = await validateSingleField(keys[3], _formData, _errors, validationSchema);

  return _errors;
};

export const validateSingleField = async (key, _formData, _errors, validationSchema) => {
  try {
    const trimValue = _formData[key]?.trim();
    await validationSchema[key].validate(trimValue.length > 0 ? _formData[key] : trimValue, _formData?.password);
  } catch (e) {
    return { ..._errors, [key]: e.message };
  }
};
