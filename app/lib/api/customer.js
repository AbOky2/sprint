import { toQueryParams } from 'helpers';
import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/customer';

export const getPartnersApiMethod = (options = {}) =>
  sendRequest(`${BASE_PATH}/partners`, {
    method: 'GET',
    ...options,
  });
export const getUserLatestSearchApiMethod = (options = {}) =>
  sendRequest(`${BASE_PATH}/userlatest-search`, {
    method: 'GET',
    ...options,
  });
export const getCurrentUserkApiMethod = (options = {}) =>
  sendRequest(`${BASE_PATH}/currentUser`, {
    method: 'GET',
    ...options,
  });
export const getPublicPropertiesApiMethod = (args, options = {}) =>
  sendRequest(`/publicSearch?${toQueryParams(args)}`, {
    ...options,
    body: JSON.stringify(args),
  });
export const getPropertiesByCoordApiMethod = (args, options = {}) =>
  sendRequest(`${BASE_PATH}/properties/coord?${toQueryParams(args)}`, {
    ...options,
    body: JSON.stringify(args),
  });

export const addBookmarkApiMethod = (args) =>
  sendRequest(`${BASE_PATH}/bookmark`, {
    body: JSON.stringify(args),
  });

export const addSponsorshipApiMethod = (args) =>
  sendRequest(`${BASE_PATH}/sponsorship`, {
    body: JSON.stringify(args),
  });

export const updateUserApiMethod = (args) =>
  sendRequest(`${BASE_PATH}/user`, {
    method: 'PUT',
    body: JSON.stringify(args),
  });
export const getPartnerApiMethod = (id, options = {}) =>
  sendRequest(`${BASE_PATH}/partner/${id}`, {
    method: 'GET',
    ...options,
  });
export const getPropertyApiMethod = (id, options = {}) =>
  sendRequest(`${BASE_PATH}/property/${id}`, {
    method: 'GET',
    ...options,
  });
export const getNewPropertiesApiMethod = (options = {}) =>
  sendRequest(`${BASE_PATH}/newProperties`, {
    method: 'GET',
    ...options,
  });
