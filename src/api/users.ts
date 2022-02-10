import { baseUrl, Path, IUser, IAuthorization } from "./api";

export const getCurrentUser = async (id: string, token: string) => {
  const response = await fetch(`${baseUrl}${Path.user}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  });

  const content: IUser = await response.json();
  return content;
}

export const getNewUserToken = async (id: string, refreshToken: string) => {
  
  const response = await fetch(`${baseUrl}${Path.user}/${id}/${Path.tokens}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refreshToken}` 
    }
  });

  const content: IAuthorization = await response.json();
  console.log(content)
  return content;
}

