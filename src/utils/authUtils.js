import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  const token = Cookies.get('token')
  return !!token;
};

export const logout = () => {
  Cookies.remove('token');
  Cookies.remove('username');
};