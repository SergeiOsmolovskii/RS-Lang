import { baseUrl, Path, IUserWords, storage } from "./api";


export const getAllUserWords = async () => {
  const response = await fetch(`${baseUrl}${Path.user}/${storage.userId}${Path.words}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}` 
    }
  });
  const content: IUserWords = await response.json();
  return content;
}

export const getUserWordById = async (wordId: string) => {
  const response = await fetch(`${baseUrl}${Path.user}/${storage.userId}${Path.words}/${wordId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}` 
    }
  });
  const content: IUserWords = await response.json();
  return content;
}

export const setUserWord = async (wordId: string, body: IUserWords) => {
  const response = await fetch(`${baseUrl}${Path.user}/${storage.userId}${Path.words}/${wordId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}` 
    },
    body: JSON.stringify(body)
  });
  const content: IUserWords = await response.json();
  return content;
}

export const updateUserWord = async (wordId: string, body: IUserWords) => {
  const response = await fetch(`${baseUrl}${Path.user}/${storage.userId}${Path.words}/${wordId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}` 
    },
    body: JSON.stringify(body)
  });
  const content: IUserWords = await response.json();
  return content;
}
