import FormInput from '@components/FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@hooks/useAuth';
import { Box, Button, Typography } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import styles from './LoginPage.module.scss';
import loginSchema from './validation/LoginSchema';

type LoginFormValues = yup.InferType<typeof loginSchema>;

const LoginPage = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    login.mutate({
      email: data.email,
      password: data.password,
    });
  };
  return (
    <div className={styles.formContainer}>
      <Box
        sx={{
          maxWidth: 400,
          margin: '0px auto',
          padding: 4,
          boxShadow: 'var(--form-shadow)',
          borderRadius: 2,
          background: 'var(--bg-dark)',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontSize: '28px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Please Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            fullWidth
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <FormInput
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              color: 'black',
              fontSize: '20px',
              backgroundColor: 'var(--color-peach)',
            }}
          >
            {login.isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default LoginPage;
