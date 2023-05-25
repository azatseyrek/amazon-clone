import { ReactNode } from 'react';

import { Grid } from '@mui/material';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Grid>
      <img src="images/amazon-logo.png" alt="amazon-logo" height="40px" />
      <main>{children}</main>
    </Grid>
  );
};

export default AuthLayout;
