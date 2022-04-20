export const validateValue = async (target, validationSchema, errors, handleSetErrors, password, validationProperty) => {
  const { name, value } = target;

  try {
    const trimValue = value?.trim();
    await validationSchema[validationProperty || name].validate(trimValue.length > 0 ? value : trimValue, password);

    if (errors?.[name]) {
      const _errors = { ...errors };
      delete _errors[name];
      handleSetErrors(Object.keys(_errors).length === 0 ? undefined : _errors);
    }
  } catch (e) {
    handleSetErrors({ ...errors, [name]: e.message });
  }
};
