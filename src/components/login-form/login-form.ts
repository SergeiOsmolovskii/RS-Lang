import './login-form.css';
import { insertElement } from '../../services/services';
import { createUser, authorization } from '../../api/registration';
import { IAuthorization, IRegistrationData, storage } from '../../api/api';
import { getCurrentUser } from '../../api/users';
import { setUserStatistic } from '../../api/statistic';

const body = document.querySelector('body');

export const renderLogInButton = (): HTMLElement => {
  const logIn = insertElement("button", ["log-in"], "", "");
  logIn.addEventListener('click', appendLoginForm);
  return logIn;
};

export const renderProfileBlock = (): string => `
  <div class="user-profile">
    <div class="user-profile__info">
      <p>${storage.userName}</p>
      <p>${storage.userEmail}</p>
    </div>
    <button class="user-icon"> </button>
    <button class="log-out"> </button>
  </div>
`;

const renderLogInForm = (): string => `
  <div class="overlay">
    <form class="login-form">
      <h3>Вход</h3>
      <div class="login-form__main">
        <label>
          <input id="user-email" type="text" placeholder="E-mail" required>
        </label>
        <label>
          <input id="user-password" type="password" placeholder="Пароль" autocomplete required minlength="8">
        </label>
      </div>
      <button class="login-submit-button" type="submit">Войти</button>
      <div class="login-form__info">
          <span>Ещё не зарегистрированы? </span>
          <button class="login-form__registration" type="button">Зарегистрироваться</button>
      </div>
    </form>
  </div>  
`;

const renderRegistrForm = (): string => `
<div class="overlay">
  <form class="registration-form">
    <h3>Регистрация</h3>
    <div class="login-form__main">
      <label>
        <input id="registration-name" type="text" placeholder="Ваше имя" required>
      </label>
      <label>
        <input id="registration-email" type="email" placeholder="E-mail" required>
      </label>
      <label>
        <input id="registration-password" type="password" placeholder="Пароль" autocomplete required minlength="8">
      </label>
      <label>
        <input id="registration-password-repeat" type="password" placeholder="Повторите пароль" autocomplete required minlength="8">
      </label>
    </div>
    <button class="registration-submit-button" type="submit">Зарегистрироваться</button>
    <div class="registration-form__info">
        <span>Уже есть аккаунт? </span>
        <button class="registration-form__log-in" type="button">Войти</button>
    </div>
  </form>
</div>
`;

 const appendLoginForm = async (): Promise<void> => {
  await removeForm();
  body?.insertAdjacentHTML('beforeend', renderLogInForm());
  closeOverlayListener();
  const loginFormRegistration = document.querySelector('.login-form__registration');
  loginFormRegistration?.addEventListener('click', appendRegistrationForm);

  const form = document.querySelector('.login-form');
  form?.addEventListener('submit', authorizationUser);

}

export async function appendRegistrationForm (): Promise<void> {
  await removeForm();
  body?.insertAdjacentHTML('beforeend', renderRegistrForm());
  closeOverlayListener();

  const registrationFormLogin = document.querySelector('.registration-form__log-in');
  registrationFormLogin?.addEventListener('click', appendLoginForm);  

  const form = document.querySelector('.registration-form');
  form?.addEventListener('submit', registrationNewUser);
}

function removeFormOverlay (this: HTMLElement, e: Event): void {
  if (e.target === this) {
    this.remove();
  }
}

async function removeForm (): Promise<void> {
  const overlay = document.querySelector('.overlay');
  overlay?.remove();
}

const closeOverlayListener = (): void => {
  const overlay = document.querySelector('.overlay');
  overlay?.addEventListener('click', removeFormOverlay);
}

export const logOut = (): void => {
  localStorage.removeItem('currentUserToken');
  localStorage.removeItem('currentUserRefreshToken');
  localStorage.removeItem('currentUserID');
  location.reload();
}

export const registrationNewUser = async (e: Event): Promise<void> => {
  e.target?.removeEventListener('submit', registrationNewUser);
  e.preventDefault();

  const userName = document.getElementById('registration-name') as HTMLInputElement;
  const userEmail = document.getElementById('registration-email') as HTMLInputElement;
  const userPassword = document.getElementById('registration-password') as HTMLInputElement;
  const userPasswordRepeat = document.getElementById('registration-password-repeat') as HTMLInputElement;

  if (userPassword.value !== userPasswordRepeat.value) {
    userPassword.style.border = '2px solid red';
    userPasswordRepeat.style.border = '2px solid red';
    return;
  }
  
  const userID: IRegistrationData | undefined = await createUser({
    "name": userName.value,
    "email": userEmail.value,
    "password": userPassword.value
  });

  const authorizationData: IAuthorization | undefined = await authorization({
    "email": userEmail.value,
    "password": userPassword.value
  });

  let wordsPerDateMap = new Map<string, number>();
  wordsPerDateMap.set(new Date().toLocaleDateString(), 0);

  if (userID && authorizationData) {
    localStorage.setItem('currentUserID', userID.id);
    localStorage.setItem('currentUserToken', authorizationData.token);
    await getCurrentUser(userID.id, authorizationData.token);
    await setUserStatistic(userID.id, {
      learnedWords: 0,
      optional: {
        general: Object.fromEntries(wordsPerDateMap),
        games: {
          sprint: {
            newWords: 0,
            trueAnswers: 0,
            bestSeries: 0,
            gamesPlayed: 0,
            wrongAnswers: 0,
          },
          audioCall: {
            newWords: 0,
            trueAnswers: 0,
            bestSeries: 0,
            gamesPlayed: 0,
            wrongAnswers: 0,
          }
        }
      }
    });  
    location.reload();
  }
}

export const authorizationUser = async (e: Event): Promise<void> => {
  e.target?.removeEventListener('submit', authorizationUser);
  e.preventDefault();

  const userEmail = document.getElementById('user-email') as HTMLInputElement;
  const userPassword = document.getElementById('user-password') as HTMLInputElement;
  
  const authorizationData: IAuthorization | undefined = await authorization({
    "email": userEmail.value,
    "password": userPassword.value
  });

  if (authorizationData) {
    localStorage.setItem('currentUserID', authorizationData.userId);
    localStorage.setItem('currentUserToken', authorizationData.token);
    localStorage.setItem('currentUserRefreshToken', authorizationData.refreshToken); 
    storage.userId = authorizationData.userId;
    location.reload();
  }
}