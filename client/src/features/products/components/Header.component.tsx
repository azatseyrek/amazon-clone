import { useEffect, useState } from 'react';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { AppBar, Badge, Box, Button, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';

import { logout, selectedUser } from '../../auth/authSlice';

const HeaderComponent = () => {
  const { user } = useAppSelector(selectedUser);
  const { cart } = useAppSelector((state) => state.product);

  const [cartCount, setCartCount] = useState(0);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(() => totalQty);
  }, [cart]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#aeb1b5', color: 'white', padding: '4px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <img
            style={{ cursor: 'pointer' }}
            src="images/amazon-logo.svg"
            alt="amazon-logo"
            height="40px"
            onClick={() => navigate('/')}
          />
          <div style={{ display: 'flex' }}>
            <div>
              <div>Hello, {user?.name}</div>
              <Button
                onClick={logoutHandler}
                sx={{ padding: 0, marginRight: '16px' }}
                color="inherit"
              >
                Sign out
              </Button>
            </div>
            <Button onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartOutlinedIcon fontSize="large" />
              </Badge>
              <span>Cart</span>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderComponent;
