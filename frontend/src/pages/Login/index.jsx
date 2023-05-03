import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { getUserData, selectIsAuth } from '../../Redux/slices/auth';

import styles from './Login.module.scss';

function Login() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register, handleSubmit, formState,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const authData = await dispatch(getUserData(data));
      if (authData.payload.token) {
        window.localStorage.setItem('token', authData.payload.token);
      } else {
        if (authData.error) {
          alert(authData.error.message);
          return;
        }
        alert('Не удалось авторизоваться');
      }
    } catch (error) {
      alert(error);
    }
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(formState.errors.email?.message)}
          helperText={formState.errors.email?.message}
          {...register('email', {
            required: 'Укажите почту',
          })}
          type="email"
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(formState.errors.password?.message)}
          helperText={formState.errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
}

export default Login;
