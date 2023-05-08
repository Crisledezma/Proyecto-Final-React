import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { useFirebaseAuth } from '@/contexts/firebase-auth-context';
import { Container, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from "next/navigation";
import { TextInput } from '@/components/atoms/TextInput';
import { AuthPage } from '@/components/layouts/AuthPage';
import PasswordInput from '@/components/atoms/PasswordInput';

const REQUIRED_FIELD_MESSAGE = 'Campo requerido';
const INVALID_EMAIL_MESSAGE = 'Correo inválido';
const MIN_PASSWORD_LENGTH_MESSAGE = 'Mínimo 8 caracteres'

interface LoginFormValues {
  email: string;
  password: string;
  repeatPassword: string;
};

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL_MESSAGE).required(REQUIRED_FIELD_MESSAGE),
  password: Yup.string().required(REQUIRED_FIELD_MESSAGE).min(8, MIN_PASSWORD_LENGTH_MESSAGE),
  repeatPassword: Yup.string().required(REQUIRED_FIELD_MESSAGE).oneOf([Yup.ref('password')], 'Las contrseñas deben ser iguales'),
});

function LoginPage() {
  const { login } = useFirebaseAuth();
  const router = useRouter();
  
  const handleSubmit = React.useCallback(
    async (values: LoginFormValues) => {
      try {
        await login(values.email, values.password);
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    }, [login, router]
  );
  const goRegister = () => router.push('/register');
  return (
    <AuthPage>
      <main className='main-wrapper min-h-screen flex flex-col justify-center'>
        <Container
          maxWidth='xs'
          component='main'
          className={`p-6 login-container rounded-3xl`}
        >
          <Formik<LoginFormValues>
            initialValues={{
              email: '',
              password: '',
              repeatPassword: '',
            }}
            validateOnBlur
            validateOnChange
            validateOnMount
            validationSchema={LoginFormSchema}
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
                  Inicia sesión!
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
                <PasswordInput
                  className='input w-80'
                  id='repeatPassword'
                  type='password'
                  label='Repita la contraseña'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repeatPassword}
                  error={!!(touched.repeatPassword && errors.repeatPassword)}
                  helperText={touched.repeatPassword && errors.repeatPassword}
                />
                <LoadingButton
                  className='m-10'
                  variant='outlined'
                  color='primary'
                  disabled={!isValid || isValidating}
                  loading={isSubmitting || isValidating}
                  type="submit"
                >
                  Iniciar sesión
                </LoadingButton>
                <Typography mb={2}>
                  No tienes cuenta? <Button onClick={goRegister} variant='text'>Haz click aquí</Button>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </main>
    </AuthPage>
  )
};

export default LoginPage