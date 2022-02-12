import { baseUrl, Path, IUser, IRegistrationData } from "./api";

export const createUser = async (user: IUser) => {
  const response = await fetch(`${baseUrl}${Path.user}`, {
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

export const authorization = async (user: IUser) => {
  const response = await fetch(`${baseUrl}${Path.signin}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await response.json();
  return content;
}