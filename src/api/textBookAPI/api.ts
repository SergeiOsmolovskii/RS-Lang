import { IWord } from "../api";

export const baseUrl = 'https://rs-lang-learn.herokuapp.com';

export enum Path {
  words = '/words',
  users = '/users',
  signIn = '/signin',
}

export interface IGetData {
  items: IWord[] | IWord;
}

export interface IQueryParams {
  key: string;
  value: string | number;
}

const createQueryString = (queryParams: Array<IQueryParams>) =>
  queryParams.length ? `?${queryParams.map((param) => `${param.key}=${param.value}`).join('&')}` : '';

export const getWords = async (queryParams: IQueryParams[]): Promise<IGetData> => {
  const response: Response = await fetch(`${baseUrl}${Path.words}${createQueryString(queryParams)}`);
  return {
    items: await response.json(),
  };
};

export const getWord = async (id: number): Promise<IWord> => (await fetch(`${baseUrl}${Path.words}/${id}`)).json();
