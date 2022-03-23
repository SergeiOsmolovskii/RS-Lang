import { baseUrl, Path, IUser, IAuthorization } from "./api";
import { logOut } from "../components/login-form/login-form";

export const getCurrentUser = async (id: string, token: string) => {
  const response = await fetch(`${baseUrl}${Path.user}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  });

  if (response.status === 401) {
    let userId = localStorage.getItem('currentUserID');
    let userRefreshToken = localStorage.getItem('currentUserRefreshToken');
    if (userId && userRefreshToken) {
      const newUserDate = await getNewUserToken(userId, userRefreshToken);
      localStorage.setItem('currentUserID', newUserDate.userId);
      localStorage.setItem('currentUserToken', newUserDate.token);
      localStorage.setItem('currentUserRefreshToken', newUserDate.refreshToken);
      location.reload();
    }
  }
  const content: IUser = await response.json();
  return content;
}

export const getNewUserToken = async (id: string, refreshToken: string) => {
  const response = await fetch(`${baseUrl}${Path.user}/${id}${Path.tokens}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refreshToken}` 
    }
  });

  if (response.status === 401) {
    logOut();
  }

  const content: IAuthorization = await response.json();
  return content;
}

