import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useFirebaseAuth } from '@/contexts/firebase-auth-context';
import { Button, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from "next/navigation";
import { TextInput } from '@/components/atoms/TextInput';
import PasswordInput from '@/components/atoms/PasswordInput';

const REQUIRED_FIELD_MESSAGE = 'Campo requerido';
const INVALID_EMAIL_MESSAGE = 'Correo inválido';
const MIN_PASSWORD_LENGTH_MESSAGE = 'Mínimo 8 caracteres'

interface RegisterFormValues {
  email: string;
  password: string;
};

const RegisterFormSchema = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL_MESSAGE).required(REQUIRED_FIELD_MESSAGE),
  password: Yup.string().required(REQUIRED_FIELD_MESSAGE).min(8, MIN_PASSWORD_LENGTH_MESSAGE)
});

function RegisterPage() {
  const { register } = useFirebaseAuth();
  const router = useRouter();
  
  const handleSubmit = React.useCallback(
    async (values: RegisterFormValues) => {
      try {
        await register(values.email, values.password);
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    }, [register, router]
  );
  const goLogin = () => router.push('/login');
  return (
    <main className='main-wrapper min-h-screen flex flex-col justify-center'>
      <Container
          maxWidth='xs'
          component='main'
          className={`p-6 login-container rounded-3xl`}
      >
        <Formik<RegisterFormValues>
          initialValues={{
            email: '',
            password: '',
          }}
          validateOnBlur
          validateOnChange
          validateOnMount
          validationSchema={RegisterFormSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            isValid,
            isValidating,
          }) => (
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
              <Typography mb={2} variant="h3">
                Regístrate!!!
              </Typography>
              <TextInput
                className='input w-80'
                id='email'
                type='email'
                label='correo electrónico'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={!!(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <PasswordInput
                className='input w-80'
                id='password'
                type='password'
                label='contraseña'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={!!(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <LoadingButton
                className='m-10'
                variant='outlined'
                color='primary'
                disabled={!isValid || isValidating}
                loading={isSubmitting || isValidating}
                type="submit"
              >
                Registrarse
              </LoadingButton>
              <Typography mb={2}>
                <Button onClick={goLogin} variant='text'>Volver a Login</Button>
              </Typography>
            </form>
          )}
        </Formik>
      </Container>
    </main>
  )
};

export default RegisterPage