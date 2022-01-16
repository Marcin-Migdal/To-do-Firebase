import * as Yup from 'yup';

export const validationSchema = {
  email: Yup.string().required('Required').max(45, "Can't be longer then 45 characters").email('Invalid email address'),
  userName: Yup.string().required('Required').min(3, 'Must be at least 3 characters').max(30, "Can't be longer then 30 characters"),
  password: Yup.string().required('Required').min(8, 'Must be at least 8 characters long').max(30, "Can't be longer then 30 characters"),
  verifyPassword: {
    validate: (verifyPassword, password) => {
      return new Promise((resolve, reject) => {
        if (!verifyPassword.trim()) reject({ field: 'verifyPassword', value: verifyPassword, message: 'Required' });
        else if (verifyPassword.length < 8)
          reject({ field: 'verifyPassword', value: verifyPassword, message: 'Must be at least 8 characters long' });
        else if (verifyPassword.length > 30)
          reject({ field: 'verifyPassword', value: verifyPassword, message: "Can't be longer then 30 characters" });
        else if (password !== verifyPassword) reject({ field: 'verifyPassword', value: verifyPassword, message: 'Password must match' });
        else resolve(true);
      });
    },
  },
};
