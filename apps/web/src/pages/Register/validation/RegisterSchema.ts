import * as yup from 'yup';

const registerSchema = yup
  .object({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        'Password must contain at least one letter and one number',
      ),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

export default registerSchema;
