import 'isomorphic-unfetch';

const { ROOT_URL } = require('../../config');

export default async function sendRequest(path, options = {}, extra) {
  const headers = {
    ...(options.headers || {}),
    ...(extra ? {} : { 'Content-type': 'application/json; charset=UTF-8' }),
  };

  const response = await fetch(`${ROOT_URL}${path}`, {
    method: 'POST',
    credentials: 'same-origin',
    ...options,
    headers,
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}
