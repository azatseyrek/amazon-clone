import { FC, FormEvent } from 'react';

import { Button, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const RegistrationFormComponent: FC = () => {
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <Box sx={{ border: 1, padding: 2, borderColor: '#cccccc', width: '350px', marginTop: 2 }}>
      <form onSubmit={onSubmitHandler}>
        <Grid container direction="column" justifyContent="flex-start">
          <Typography variant="h4" component="h1">
            Create Account
          </Typography>
          <InputLabel sx={{ fontWeight: '500', marginTop: 1, color: '#000000' }} htmlFor="name">
            Your name
          </InputLabel>
          <TextField type="text" name="name" id="name" variant="outlined" size="small" />
          <InputLabel sx={{ fontWeight: '500', marginTop: 1, color: '#000000' }} htmlFor="email">
            Email
          </InputLabel>
          <TextField type="email" name="email" id="email" variant="outlined" size="small" />
          <InputLabel sx={{ fontWeight: '500', marginTop: 1, color: '#000000' }} htmlFor="password">
            Password
          </InputLabel>
          <TextField
            autoComplete="off"
            type="password"
            name="password"
            id="password"
            variant="outlined"
            size="small"
            placeholder="minimum 6 characters required"
          />
          <InputLabel sx={{ fontWeight: '500', marginTop: 1, color: '#000000' }} htmlFor="confirmPassword">
            Confirm Password
          </InputLabel>
          <TextField
            autoComplete="off"
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
          <a href="#" style={{ textDecoration: 'none' }}>
            {' '}
            Conditions of use
          </a>{' '}
          and{' '}
          <a href="#" style={{ textDecoration: 'none' }}>
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
          <a href="#" style={{ textDecoration: 'none' }}>
            {' '}
            Create a free business acount
          </a>{' '}
        </small>
      </div>
    </Box>
  );
};

export default RegistrationFormComponent;
