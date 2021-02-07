import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/public';

export const login = ({ email, password }) =>
  sendRequest(`/auth/signin`, {
    body: JSON.stringify({ email, password }),
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
