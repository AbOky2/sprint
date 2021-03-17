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

export const getBookDetailApiMethod = ({ slug }) =>
  sendRequest(`${BASE_PATH}/books/${slug}`, {
    method: 'GET',
  });

export const getChapterDetailApiMethod = ({ bookSlug, chapterSlug }, options = {}) =>
  sendRequest(`${BASE_PATH}/get-chapter-detail?bookSlug=${bookSlug}&chapterSlug=${chapterSlug}`, {
    method: 'GET',
    ...options,
  });
