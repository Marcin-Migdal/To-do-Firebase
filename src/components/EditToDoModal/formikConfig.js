import * as Yup from 'yup';

export const validationSchema = {
  name: Yup.string().required('Required').max(35, 'Max 35 characters'),
  description: Yup.string().max(500, "Description can't be longer then 500 characters"),
};
