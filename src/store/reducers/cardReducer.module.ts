export const CHOUSE_CATEGORY = 'CHOUSE_CATEGORY';
export const CHANGE_MODE = 'CHANGE_MODE';
export const SHOW_MENU = 'SHOW_MENU';

// export enum typePage {
//   CATEGORIES_PAGE = 'CATEGORIES_PAGE',
//   ONE_CATEGORY = 'ONE_CATEGORY',
// }

// export enum modeApp {
//   GAME_MODE = 'GAME_MODE',
//   TRANING_MODE = 'TRANING_MODE',
// }

export interface ICards {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface ICardsState {
  categoryCards: string[];
  listCards: ICards[][];
  indexCategory: number | null;
  isModePlay: boolean;
  isShowLeftMenu: boolean;
}

export interface IAction {
  type: string;
  payload?: any;
}
