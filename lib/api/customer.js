import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/customer';

export const getPartnersApiMethod = (options = {}) =>
  sendRequest(`${BASE_PATH}/partners`, {
    method: 'GET',
    ...options,
  });

export const getPartnerApiMethod = (id, options = {}) =>
  sendRequest(`${BASE_PATH}/partner/${id}`, {
    method: 'GET',
    ...options,
  });

export const fetchCheckoutSessionApiMethod = ({ bookId, redirectUrl }) =>
  sendRequest(`${BASE_PATH}/stripe/fetch-checkout-session`, {
    body: JSON.stringify({ bookId, redirectUrl }),
  });

export const getMyBookListApiMethod = (options = {}) =>
  sendRequest(`${BASE_PATH}/my-books`, {
    method: 'GET',
    ...options,
  });
