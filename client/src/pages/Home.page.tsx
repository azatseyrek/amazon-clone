import { useEffect } from 'react';

import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks';

import { logout } from '../features/auth/authSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button
        onClick={logoutHandler}
        style={{
          backgroundColor: 'yellow',
          cursor: 'pointer',
          height: '40px',
          width: '60px',
          padding: '8px',
        }}
      >
        Logout
      </button>
      {user?.email}
    </div>
  );
};

export default HomePage;
