// src/utils/auth.js
export const isLoggedIn = () => {
  return localStorage.getItem('user') !== null;
};

export const login = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('user');
};
