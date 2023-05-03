import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { selectIsAuth, registration } from '../../Redux/slices/auth';

import styles from './Login.module.scss';

function Registration() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register, handleSubmit, formState,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const registrationData = await dispatch(registration(data));
      if (registrationData.payload.token) {
        window.localStorage.setItem('token', registrationData.payload.token);
      } else {
        if (registrationData.error) {
          alert(registrationData.error.message);
          return;
        }
        alert('Не удалось зарегистрироваться');
      }
    } catch (error) {
      alert(error);
    }
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(formState.errors.fullName?.message)}
          helperText={formState.errors.fullName?.message}
          {...register('fullName', {
            required: 'Укажите имя',
          })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          error={Boolean(formState.errors.email?.message)}
          helperText={formState.errors.email?.message}
          {...register('email', {
            required: 'Укажите почту',
          })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(formState.errors.password?.message)}
          helperText={formState.errors.password?.message}
          {...register('password', {
            required: 'Укажите пароль',
          })}
          className={styles.field}
          label="Пароль"
          type="password"
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
        {' '}
      </form>
    </Paper>
  );
}

export default Registration;
