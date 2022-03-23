import { IWord, Path, baseUrl, IQueryParams, IGetData } from "./api";

const createQueryString = (queryParams: Array<IQueryParams>) =>
  queryParams.length ? `?${queryParams.map((param) => `${param.key}=${param.value}`).join('&')}` : '';

export const getWords = async (queryParams: IQueryParams[]): Promise<IGetData> => {
  const response = await fetch(`${baseUrl}${Path.words}${createQueryString(queryParams)}`);
  return {
    items: await response.json(),
  };
};

export const getWord = async (id: number) : Promise<IWord> =>  {
  const response = await fetch(`${baseUrl}${Path.words}/${id}` , {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const content = await response.json();
  return content;
};