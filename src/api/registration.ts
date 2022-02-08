import { URL } from "../options/options";

export interface IUser {
  email: string,
  password: string,
  name?: string
}

export interface IRegistrationData {
  id: string,
  email: string,
  name: string
}

export interface IAuthorization {
  message: string,
  name: string,
  refreshToken: string,
  token: string,
  userId: string
}

export const createUser = async (user: IUser) => {
  const response = await fetch(`${URL}/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content: IRegistrationData = await response.json();
  return content;
};

export const getCurrentUser = async (id: string, token: string) => {
  const response = await fetch(`${URL}/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  });
  const content: IUser = await response.json();
  console.log(content);
  return content;
}

export const authorization = async (user: IUser) => {
  const response = await fetch(`${URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await response.json();
  console.log(content);
  return content;
}