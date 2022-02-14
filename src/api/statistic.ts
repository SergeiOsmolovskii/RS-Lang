import { baseUrl, Path, IAggregatedWord, storage, IStatistic } from "./api";

export const getUserStatistic = async () => {
  const response = await fetch(`${baseUrl}${Path.user}/${storage.userId}${Path.statistics}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}` 
    },
  });
  const content: IStatistic = await response.json();
  console.log(content);
  return content;
}

export const setUserStatistic = async (body: IStatistic) => {
  const response = await fetch(`${baseUrl}${Path.user}/${storage.userId}${Path.statistics}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}` 
    },
    body: JSON.stringify(body)
  });
  const content: IStatistic = await response.json();
  console.log(content);
  return content;
}