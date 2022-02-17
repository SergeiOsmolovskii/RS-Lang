export const storage = {
	userId : '',
	userName : '',
	userEmail: '',
	userGameRegime: '',
	isAuthorized: false,
}

export const baseUrl = 'https://rs-lang-learn.herokuapp.com';

export enum Path {
	words = '/words',
	user = '/users',
	aggregatedWords = '/aggregatedWords',
	settings = '/settings',
	statistics = '/statistics', 
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
	trueAnswersCount: number,
	falseAnswersCount: number,
	trueAnswersSeria: number,
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

/* Statistic */
export interface IStatistic {
	learnedWords: number,
	optional: {
		general: object,
		games: IGames
	}
}

export interface IGeneralStatistic {
	day: Date | string,
	newWordsPerDay: number,
}

export interface IGames {
	sprint: IGamesStatistic,
	audioCall: IGamesStatistic
}

export interface IGamesStatistic {
	newWords: number,
	trueAnswers: number,
	bestSeries: number,
	gamesPlayed: number,
	wrongAnswers: number
}

export interface IGameParam {
	newWords: number,
  trueAnswers: number,
  bestSeries: number,
  gamesPlayed: number
}