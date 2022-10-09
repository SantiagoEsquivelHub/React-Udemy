import { Button, Grid, Link, TextField } from '@mui/material'
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { AuthLayout } from '../layout/AuthLayout'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

/* const formValidations = {
  email: [value => value.includes('@'), 'El correo debe de tener una @'],
  password: [value => value.length >= 6, 'El password debe de tener mas de 6 letras'],
  displayName: [value => value.length >= 1, 'El displayName es obligatorio'],
} */

const formValidations = {
  email: [(value) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value), 'El correo debe de tener una @'],
  password: [(value) => value.length >= 6, 'El password debe de tener mas de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El displayName es obligatorio'],
}



export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formState)

    setFormSubmitted(true);
  }

  return (
    <AuthLayout title='Crear cuenta'>
      <h1>FormValid {isFormValid ? 'Valido' : 'Incorrecto'}</h1>
      <form onSubmit={onSubmit}>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Nombre completo'
              type='text'
              placeholder='Nombre completo'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>


          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                variant='contained'
                fullWidth
                type='submit'
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            direction='row'
            justifyContent='end'
          >
            <Link component={RouterLink} color='inherit' to="/auth/login">
              ¿Ya tienes una cuenta?
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
