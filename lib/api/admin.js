import sendRequest from './sendRequest';
import { toFormData } from '../../helpers/convertAndCheck';

const BASE_PATH = '/api/v1/admin';

export const getUsersApiMethod = () =>
  sendRequest(`${BASE_PATH}/users`, {
    method: 'GET',
  });
export const getBookListApiMethod = () =>
  sendRequest(`${BASE_PATH}/books`, {
    method: 'GET',
  });
export const getPartnersApiMethod = () =>
  sendRequest(`${BASE_PATH}/partners`, {
    method: 'GET',
  });
export const deletePartnerApiMethod = (id) =>
  sendRequest(`${BASE_PATH}/partner/${id}`, {
    method: 'DELETE',
  });
export const addPartnerApiMethod = (args) =>
  sendRequest(
    `${BASE_PATH}/partner`,
    {
      body: toFormData(args),
    },
    true,
  );
export const updatePartnerApiMethod = (id, args) =>
  sendRequest(
    `${BASE_PATH}/partner/${id}`,
    {
      method: 'PUT',
      body: toFormData(args),
    },
    true,
  );

export const addBookApiMethod = ({ name, price, githubRepo }) =>
  sendRequest(`${BASE_PATH}/books/add`, {
    body: JSON.stringify({ name, price, githubRepo }),
  });

export const editBookApiMethod = ({ id, name, price, githubRepo }) =>
  sendRequest(`${BASE_PATH}/books/edit`, {
    body: JSON.stringify({
      id,
      name,
      price,
      githubRepo,
    }),
  });

export const getBookDetailApiMethod = ({ slug }) =>
  sendRequest(`${BASE_PATH}/books/detail/${slug}`, {
    method: 'GET',
  });

// github methods

export const getGithubReposApiMethod = () =>
  sendRequest(`${BASE_PATH}/github/repos`, {
    method: 'GET',
  });

export const syncBookContentApiMethod = ({ bookId }) =>
  sendRequest(`${BASE_PATH}/books/sync-content`, {
    body: JSON.stringify({ bookId }),
  });
