import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/public';

export const signIn = (args) =>
  sendRequest(`/auth/signin`, {
    body: JSON.stringify(args),
  });
export const signUp = (args) =>
  sendRequest(`/auth/signup`, {
    body: JSON.stringify(args),
  });

export const authSocialMedia = (args) =>
  sendRequest(`/auth/${args.provider}`, {
    body: JSON.stringify(args),
  });

export const getUserByEmail = (args) =>
  sendRequest(`/api/v1/customer/user`, {
    body: JSON.stringify(args),
  });
export const resetPassword = (args) =>
  sendRequest(`/auth/resetPassword`, {
    body: JSON.stringify(args),
  });
export const forgotPassword = (args) =>
  sendRequest(`/auth/forgotPassword`, {
    body: JSON.stringify(args),
  });
export const logOut = () =>
  sendRequest(`/auth/logout`, {
    method: 'GET',
  });
export const getPromotedApiMethod = () =>
  sendRequest(`/promoted`, { method: 'GET' });
