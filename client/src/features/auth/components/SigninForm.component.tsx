import { FC, FormEvent, useEffect } from 'react';

import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';

import useInput from '../../../hooks/inputs/use-input';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';

import { validateEmail } from '../../../shared/utils/validation/email';
import { validatePasswordLength } from '../../../shared/utils/validation/length';
import { login, reset } from '../authSlice';
import { LoginUser } from '../models/LoginUser.interface';

const SigninFormComponent: FC = () => {
  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, isAuthenticated } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    const clearForm = () => {
      emailClearHandler();
      passwordClearHandler();
    };
    if (isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, [dispatch, emailClearHandler, isSuccess, navigate, passwordClearHandler]);

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate('/');
  }, [isAuthenticated, navigate]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }

    if (email.length === 0 || password.length === 0) {
      return;
    }
    const loginUser: LoginUser = {
      email,
      password,
    };

    dispatch(login(loginUser));
  };

  if (isLoading) {
    return <CircularProgress sx={{ marginTop: '64px' }} color="primary" />;
  }

  return (
    <>
      <Box
        sx={{
          border: 1,
          padding: 2,
          borderColor: '#cccccc',
          width: '350px',
          marginTop: 2,
        }}
      >
        <form onSubmit={onSubmitHandler}>
          <Grid container direction="column" justifyContent="flex-start">
            <Typography variant="h4" component="h1">
              Sign-In
            </Typography>

            <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor="email">
              Email
            </InputLabel>
            <TextField
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailHasError}
              helperText={emailHasError ? 'Enter your email' : ''}
              type="email"
              name="email"
              id="email"
              variant="outlined"
              size="small"
            />

            <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor="password">
              Password
            </InputLabel>
            <TextField
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={passwordHasError ? 'Minimum 6 characters required' : ''}
              type="password"
              name="password"
              id="password"
              variant="outlined"
              size="small"
              placeholder="Minimum 6 characters required"
              autoComplete="off"
            />

            <Button
              id="signin-btn"
              disabled={!validatePasswordLength(password) || !validateEmail(email)}
              variant="contained"
              style={{
                marginTop: '16px',
                height: '31px',
                backgroundColor: `${
                  !validatePasswordLength(password) || !validateEmail(email) ? '#cccccc' : '#f0c14b'
                }`,
                color: 'black',
                borderColor: '#a88734 #9c7e31 #846a29',
                textTransform: 'none',
              }}
              type="submit"
            >
              Sign-In
            </Button>
          </Grid>
        </form>

        <div style={{ marginTop: '30px' }}>
          <small>
            <span>By continuing, you agree to Amazon's</span>
          </small>
        </div>

        <div>
          <small>
            <a
              href="https://www.amazon.com.tr/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=201909000"
              style={{ textDecoration: 'none' }}
            >
              {' '}
              Conditions of use
            </a>{' '}
            and{' '}
            <a
              href="https://www.amazon.com.tr/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=201909000"
              style={{ textDecoration: 'none' }}
            >
              Privacy policy
            </a>
          </small>
        </div>
      </Box>
      <div style={{ marginTop: '16px' }}>
        <Divider>
          <small style={{ color: '#767676' }}>New to Amazon?</small>
        </Divider>

        <Link
          id="register-link"
          to="/register"
          style={{ textDecoration: 'none', color: '#0000ee' }}
        >
          <Button
            variant="contained"
            style={{
              width: '100%',
              marginTop: '12px',
              height: '31px',
              backgroundColor: '#f1f1f1',
              color: 'black',
              textTransform: 'none',
            }}
          >
            Register
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SigninFormComponent;
