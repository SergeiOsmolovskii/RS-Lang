export interface IWords {
    id: string,
    group: number,
    page: number,
    word: string,
    image: string,
    audio: string,
    audioMeaning: string,
    audioExample: string,
    textMeaning: string,
    textExample: string,
    transcription: string,
    wordTranslate: string,
    textMeaningTranslate: string,
    textExampleTranslate: string
}

export const getWords = async(group: number) => {
  const response = await fetch(`https://rs-lang-learn.herokuapp.com/words?group=${group}`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  const content: IWords = await response.json();
  return content
};