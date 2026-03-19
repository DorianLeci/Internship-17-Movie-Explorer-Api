import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@hooks/useAuth';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import styles from './RegisterPage.module.scss';
import registerSchema from './validation/RegisterSchema';

type RegisterFormValues = yup.InferType<typeof registerSchema>;

const RegisterPage = () => {
  const { registerMutation } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: yupResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    registerMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className={styles.formContainer}>
      <Box
        sx={{
          maxWidth: 400,
          margin: '100px auto',
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          background:
            'linear-gradient(180deg, rgb(76, 34, 143) 0%, rgb(113, 65, 196) 100%);',
        }}
      >
        <Typography variant="h5" mb={2}>
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formField}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--color-peach)',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#333',
                },
                '& .MuiFormHelperText-root': {
                  color: 'red',
                },
              }}
            />
          </div>
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {'Register'}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default RegisterPage;
