import * as Yup from 'yup';

export const validationSchema = {
  email: Yup.string().required('Required').max(45, "Can't be longer then 45 characters").email('Invalid email address'),
  password: Yup.string().required('Required').min(8, 'Must be at least 8 characters long').max(30, "Can't be longer then 30 characters"),
};
