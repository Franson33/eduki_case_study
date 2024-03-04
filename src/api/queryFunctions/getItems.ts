import {baseUrl, TOKEN} from '../api';
import {createUrl} from '..';

const headers = new Headers({
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
});

export const getItems = async (
  searchParam: string,
  page: number,
  limit = 20,
) => {
  const requestParams = {
    limit: limit,
    p: page,
    q: searchParam,
    world: 'de',
  };

  const url = createUrl(baseUrl, requestParams);

  const result = await fetch(url, {
    method: 'GET',
    headers: headers,
  });

  return result;
};
