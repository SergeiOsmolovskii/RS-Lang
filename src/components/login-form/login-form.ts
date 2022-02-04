import './login-form.css';
import { insertElement } from '../../services/services';

export const renderLogInButton = (): HTMLElement => {
  const logIn = insertElement("button", ["log-in"], "", "");
  logIn.addEventListener('click', appendLoginbBlock);
  return logIn;
};

const renderLogInForm = (): string => `
    <form class="login-form">
      <h3>Вход</h3>
      <div class="login-form__main">
        <label>
          <input id="login-email" type="email" placeholder="E-mail">
        </label>
        <label>
          <input id="login-password" type="password" placeholder="Пароль" autocomplete>
        </label>
      </div>
      <button class="login-submit-button" type="submit">Войти</button>
      <div>
          <span>Ещё не зарегистрированы? </span>
          <button class="login-form__registration">Зарегистрироваться</button>
      </div>
    </form>
`;

const renderRegistrForm = (): string => `
  <form class="registration-form">
    <h3>Регистрация</h3>
    <div class="login-form__main">
      <label>
        <input id="registration-email" type="email" placeholder="E-mail">
      </label>
      <label>
        <input id="registration-password" type="password" placeholder="Пароль" autocomplete>
      </label>
      <label>
        <input id="registration-password-repeat" type="password" placeholder="Повторите пароль" autocomplete>
      </label>
    </div>
    <button class="registration-submit-button" type="submit">Зарегистрироваться</button>
    <div>
        <span>Уже есть аккаунт? </span>
        <button class="registration-form__log-in">Войти</button>
    </div>
  </form>
`;

const appendLoginbBlock = () => {
  const body = document.querySelector('body');
  const owerlay = insertElement("div", ["login-owerlay"], "", "");
  body?.append(owerlay);
  appendLoginbForm(owerlay);
}

const appendLoginbForm = (owerlay: HTMLElement) => {
  owerlay?.insertAdjacentHTML('beforeend', renderLogInForm());
  const loginOwerlay = document.querySelector('.login-owerlay');
  loginOwerlay?.addEventListener('click', removeFormOwerlay);
  const loginFormRegistration = document.querySelector('.login-form__registration');
  loginFormRegistration?.addEventListener('click', changeForms);
}

function changeForms () {
  const loginOwerlay = document.querySelector('.login-owerlay') as HTMLElement;
  removeForm();
  loginOwerlay?.insertAdjacentHTML('beforeend', renderRegistrForm());
  const registrationFormLogin = document.querySelector('.registration-form__log-in');
  registrationFormLogin?.addEventListener('click', removeForm);
  registrationFormLogin?.addEventListener('click', () => appendLoginbForm(loginOwerlay)); 
}

function removeFormOwerlay (this: HTMLElement, e: Event) {
  if (e.target === this) {
    this.remove();
  }
}

function removeForm () {
  const form = document.querySelector('form') as HTMLElement;
  form.remove();
}