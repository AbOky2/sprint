import 'isomorphic-unfetch';
import { toast } from 'react-toastify';

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

  let data;
  try {
    data = await response.json();
    if (data.error || data.message) toast.warn(data.error || data.message);
    console.log(data);
  } catch (error) {
    // throw new Error(error);
  }

  return data;
}
