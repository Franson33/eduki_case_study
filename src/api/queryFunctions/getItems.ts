import {baseUrl, TOKEN} from '../api';
import {createUrl} from '..';

export const getItems = async (
  searchParam: string,
  page: number,
  limit = 20,
) => {
  const headers = new Headers({
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  });

  const requestParams = {
    limit: limit,
    p: page,
    q: searchParam,
    world: 'de',
  };

  const url = createUrl(baseUrl, requestParams);

  try {
    const response = await fetch(url, {method: 'GET', headers: headers});

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (err) {
    console.error('Fetching items failed:', err);
    throw err;
  }
};
