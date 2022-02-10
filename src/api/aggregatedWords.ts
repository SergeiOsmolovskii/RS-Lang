import { baseUrl, Path, IAggregatedWord, storage } from "./api";

export const getAllAggregatedWords = async (group: string, page: string, wordsPerPage: string = '20' ,filter: string) => {
  const response = await fetch(`${baseUrl}${Path.user}/${storage.userId}${Path.aggregatedWords}?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter=${filter}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}` 
    },
  });
  const content: IAggregatedWord = await response.json();
  console.log(content);
  return content;
}

export const getAggregatedWord = async (wordId: string) => {
  const response = await fetch(`${baseUrl}${Path.user}/${storage.userId}${Path.aggregatedWords}/${wordId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}` 
    },
  });
  const content: IAggregatedWord = await response.json();
  console.log(content);
  return content;
}
