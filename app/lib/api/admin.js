import sendRequest from './sendRequest';
import { toFormData } from 'helpers';

const BASE_PATH = '/api/v1/admin';

export const getUsersApiMethod = (page = 1, options = {}) =>
  sendRequest(`${BASE_PATH}/users?offset=${page}`, {
    method: 'GET',
    ...options,
  });
export const deleteUserApiMethod = (id) =>
  sendRequest(`${BASE_PATH}/user/${id}`, {
    method: 'DELETE',
  });
export const getBookListApiMethod = () =>
  sendRequest(`${BASE_PATH}/books`, {
    method: 'GET',
  });
export const getPartnersApiMethod = () =>
  sendRequest(`${BASE_PATH}/partners`, {
    method: 'GET',
  });
export const getPartnerTypesApiMethod = () =>
  sendRequest(`${BASE_PATH}/partnerTypes`, {
    method: 'GET',
  });
export const deletePartnerApiMethod = (id) =>
  sendRequest(`${BASE_PATH}/partner/${id}`, {
    method: 'DELETE',
  });

export const deletePartnerTypekApiMethod = (name) =>
  sendRequest(`${BASE_PATH}/partnerType/${name}`, {
    method: 'DELETE',
  });
export const togglePromotedApiMethod = (args) =>
  sendRequest(`${BASE_PATH}/promoted`, {
    method: 'POST',
    body: JSON.stringify(args),
  });
export const addPartnerApiMethod = (args) =>
  sendRequest(
    `${BASE_PATH}/partner`,
    {
      body: toFormData(args),
    },
    true
  );
export const updatePartnerApiMethod = (id, args) =>
  sendRequest(
    `${BASE_PATH}/partner/${id}`,
    {
      method: 'PUT',
      body: toFormData(args),
    },
    true
  );

export const addPartnerTypeMethod = (name) =>
  sendRequest(`${BASE_PATH}/partnerType`, {
    body: JSON.stringify({ name }),
  });
