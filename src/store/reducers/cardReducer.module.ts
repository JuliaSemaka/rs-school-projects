export const CHOOSE_CATEGORY = 'CHOOSE_CATEGORY';
export const CHANGE_MODE = 'CHANGE_MODE';
export const CHANGE_MAIN_PAGE = 'CHANGE_MAIN_PAGE';
export const CHANGE_STATISTICS_PAGE = 'CHANGE_STATISTICS_PAGE';
export const SHOW_MENU = 'SHOW_MENU';
export const HIDE_MENU = 'HIDE_MENU';
export const FILL_ARRAY_GAME_WORDS = 'FILL_ARRAY_GAME_WORDS';
export const SET_STARS = 'SET_STARS';
export const GET_CARDS = 'GET_CARDS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const DELETE_CARD = 'DELETE_CARD';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const CREATE_CARD = 'CREATE_CARD';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CARD = 'UPDATE_CARD';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export enum typePage {
  CATEGORIES_PAGE = 'CATEGORIES_PAGE',
  MAIN_PAGE = 'MAIN_PAGE',
  STATISTICS_PAGE = 'STATISTICS_PAGE',
}

export enum Stars {
  STAR = 'star',
  STAR_WIN = 'star-win',
}

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
  arrGameWords: ICards[];
  arrStars: Stars[];
  page: typePage;
  isLoadingData: boolean;
}

export interface IAction {
  type: string;
  payload?: any;
}

export enum Links {
  cards = 'https://mysterious-falls-98420.herokuapp.com/api/cards',
  categories = 'https://mysterious-falls-98420.herokuapp.com/api/categories',
  static = 'https://mysterious-falls-98420.herokuapp.com/',
}
