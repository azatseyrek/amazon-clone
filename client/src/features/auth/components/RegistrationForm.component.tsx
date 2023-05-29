import { FC, FormEvent } from 'react';

import { Button, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

import { useInput } from '../../../hooks/inputs/use-input';

import { validateEmail } from '../../..//shared/utils/validation/email';
import {
  validateNameLength,
  validatePasswordLength,
} from '../../../shared/utils/validation/length';

const RegistrationFormComponent: FC = () => {
  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength);

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

  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }

    if (nameHasError || emailHasError || passwordHasError || confirmPasswordHasError) {
      return;
    }

    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };

    console.log('New User', newUser);

    clearForm();
  };

  return (
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
            Create Account
          </Typography>
          <InputLabel sx={{ fontWeight: '500', marginTop: 1, color: '#000000' }} htmlFor="name">
            Your name
          </InputLabel>
          <TextField
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError ? 'Enter your name' : ''}
            type="text"
            name="name"
            id="name"
            variant="outlined"
            size="small"
          />
          <InputLabel sx={{ fontWeight: '500', marginTop: 1, color: '#000000' }} htmlFor="email">
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
          <InputLabel sx={{ fontWeight: '500', marginTop: 1, color: '#000000' }} htmlFor="password">
            Password
          </InputLabel>
          <TextField
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText={passwordHasError ? 'Minimum 6 characters required' : ''}
            autoComplete="off"
            type="password"
            name="password"
            id="password"
            variant="outlined"
            size="small"
            placeholder="minimum 6 characters required"
          />
          <InputLabel
            sx={{ fontWeight: '500', marginTop: 1, color: '#000000' }}
            htmlFor="confirmPassword"
          >
            Confirm Password
          </InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPassword.length > 0 && password !== confirmPassword}
            helperText={
              confirmPassword.length > 0 && password !== confirmPassword
                ? 'Passwords must match'
                : ''
            }
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            variant="outlined"
            size="small"
          />
          <Button
            id="register-btn"
            variant="contained"
            style={{
              marginTop: '16px',
              height: '31px',
              backgroundColor: '#f0c14b',
              color: 'black',
              borderColor: '#a88734 #9c7e31 #846a29',
              textTransform: 'none',
            }}
            type="submit"
          >
            Register
          </Button>
        </Grid>
      </form>
      <div style={{ marginTop: '30px' }}>
        <small>
          <span>By creating an account, you agree to Amazon's</span>
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

      <Divider sx={{ marginTop: '36px', marginBottom: '36px' }} />

      <div>
        <small>
          Already have an account?{' '}
          <Link to="/signin" style={{ textDecoration: 'none', color: '#0000ee' }}>
            Sign-in
          </Link>
        </small>
      </div>

      <div>
        <small>
          Buying for work?
          <a
            href="https://www.amazon.com.tr/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=201909000"
            style={{ textDecoration: 'none' }}
          >
            {' '}
            Create a free business acount
          </a>{' '}
        </small>
      </div>
    </Box>
  );
};

export default RegistrationFormComponent;
