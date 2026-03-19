import FormInput from '@components/FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@hooks/useAuth';
import { Box, Button, Typography } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import styles from './RegisterPage.module.scss';
import registerSchema from './validation/RegisterSchema';

type RegisterFormValues = yup.InferType<typeof registerSchema>;

const RegisterPage = () => {
  const { registerMutation } = useAuth();
  const { mutate, isLoading } = registerMutation;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: yupResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    mutate({
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
          boxShadow: 'var(--card-shadow)',
          borderRadius: 2,
          background: 'var(--card-bg)',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontSize: '28px',
            textShadow: 'var(--text-shadow-black)',
            textAlign: 'center',
          }}
        >
          Please Register
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

          <FormInput
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
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
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default RegisterPage;
