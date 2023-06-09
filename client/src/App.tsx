import { ThemeProvider } from '@mui/material';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import CartPage from './pages/Cart.page';
import HomePage from './pages/Home.page';
import RegisterPage from './pages/Register.page';
import SigninPage from './pages/Signin.page';

import PrivateRoute from './features/auth/components/PrivateRoute';
import { theme } from './shared/utils/theme';
import { store } from './store';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute page={<HomePage />} />} />
          <Route path="/cart" element={<PrivateRoute page={<CartPage />} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

type CypressWindow = Window & typeof globalThis & { Cypress: any; store: any };

const thisWindow = window as CypressWindow;

if (thisWindow.Cypress) {
  console.log('CYPRESS WINDOW');

  thisWindow.store = store;
}

export default App;
