export interface ICards {
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
}

export interface ICreateCard {
  indexCategory: number;
  data: ICards;
}