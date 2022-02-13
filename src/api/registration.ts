import { baseUrl, Path, IUser, IRegistrationData, IAuthorization } from "./api";
import { insertElement } from "../services/services";
import { authorizationUser, registrationNewUser } from "../components/login-form/login-form";

export const createUser = async (user: IUser) => {
  try {
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
  } catch (error) {
    const registrationFormInfo = document.querySelector('.registration-form__info');
    const errorMessage = insertElement('p', ['fail-data'], 'Такая электронная почта уже существует!');
    const registrationForm = document.querySelector('.registration-form') as HTMLElement;
    registrationFormInfo?.append(errorMessage);
    setTimeout(() => {
      errorMessage.remove();
      registrationForm?.addEventListener('submit', registrationNewUser);
    }, 5000);
  }
};

export const authorization = async (user: IUser) => {
  try {
    const response = await fetch(`${baseUrl}${Path.signin}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const content: IAuthorization = await response.json();
  console.log(content)

    return content;
  } catch (error) {
      const loginFormMain = document.querySelector('.login-form__info');
      const loginForm = document.querySelector('.login-form') as HTMLElement;
      const errorMessage = insertElement('p', ['fail-data'], 'Неверный логин или пароль!');
      loginFormMain?.append(errorMessage);
      setTimeout(() => {
        errorMessage.remove();
        loginForm.addEventListener('submit', authorizationUser);
      }, 5000);
  }
};