import jwt_decode from 'jwt-decode';

import { DecodedJwt } from '../models/DecodedJwt.interface';
import { DisplayUser } from '../models/DisplayUser.interface';
import { Jwt } from '../models/Jwt';
import { LoginUser } from '../models/LoginUser.interface';
import { NewUser } from '../models/NewUser';

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await fetch(`${process.env.REACT_APP_BASE_API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};

const login = async (user: LoginUser): Promise<{ jwt: Jwt; user: DisplayUser | null }> => {
  const response = await fetch(`${process.env.REACT_APP_BASE_API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('jwt', JSON.stringify(data));

    const decodedJwt: DecodedJwt = jwt_decode(data.token);
    localStorage.setItem('user', JSON.stringify(decodedJwt.user));
    return { jwt: data, user: decodedJwt.user };
  } else {
    return { jwt: null, user: null };
  }
};

const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwt');
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await fetch(`${process.env.REACT_APP_BASE_API}/auth/verify-jwt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jwt }),
  });

  if (response.ok) {
    const data = await response.json();
    const jwtExpirationMs = data.exp * 1000; // convert to milliseconds
    return jwtExpirationMs > Date.now();
  } else {
    return false;
  }
};

const authService = {
  register,
  login,
  logout,
  verifyJwt,
};

export default authService;
