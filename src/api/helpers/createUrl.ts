export const createUrl = (baseUrl: string, params: any) => {
  const url = new URL(baseUrl);

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  return url;
};
