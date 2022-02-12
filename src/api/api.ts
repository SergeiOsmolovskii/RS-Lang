export const storage = {
	userId : '',
	userName : '',
	userEmail: '',
	isAuthorized: false,
}

export const baseUrl = 'https://rs-lang-learn.herokuapp.com';

export enum Path {
	words = '/words',
	user = '/users',
	aggregatedWords = '/aggregatedWords',
	settings = '/settings',
	signin = '/signin',
	tokens = '/tokens'
}

/* Registration */

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

/* Words */

export interface IWord {
	id: string;
	group: number;
	page: number;
	word: string;
	image: string;
	audio: string;
	audioMeaning: string;
	audioExample: string;
	textMeaning: string;
	textExample: string;
	transcription: string;
	wordTranslate: string;
	textMeaningTranslate: string;
	textExampleTranslate: string;
}

export interface IGetData {
  items: IWord[] | IWord;
}

export interface IQueryParams {
  key: string;
  value: string | number;
}

/* User */

export interface IUserWords {
  difficulty: string,
  optional?: IUserWordOptions
}

export interface IUserWordOptions {
	wordId: string,
	trueAnswersCount: number,
	falseAnswersCount: number,
	trueAnswersSeria: number,
	falseAnswersSeria: number
}

/* AggregatedWord */

export interface IAggregatedWord {
	_id: string;
	group: number;
	page: number;
	word: string;
	image: string;
	audio: string;
	audioMeaning: string;
	audioExample: string;
	textMeaning: string;
	textExample: string;
	transcription: string;
	wordTranslate: string;
	textMeaningTranslate: string;
	textExampleTranslate: string;
	userWord?: IUserWords
}