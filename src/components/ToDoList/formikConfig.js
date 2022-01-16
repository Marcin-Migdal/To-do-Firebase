import * as Yup from 'yup';

export const validationSchema = {
  name: Yup.string().max(35, "Name can't be longer then 35 characters"),
  description: Yup.string().max(500, "Description can't be longer then 500 characters"),
};
