export const createUrl = (baseUrl: string, params: any) => {
  const searchParams = new URLSearchParams(params);

  return `${baseUrl}?${searchParams.toString()}`;
};
