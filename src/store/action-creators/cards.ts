import { CHANGE_MODE, CHOUSE_CATEGORY, FILL_ARRAY_GAME_WORDS, HIDE_MENU, IAction, ICards, SHOW_MENU } from "../reducers/cardReducer.module";

export function changeMode(): IAction {
  return {type: CHANGE_MODE};
}

export function showMenu(): IAction {
  return {type: SHOW_MENU};
}

export function hideMenu(): IAction {
  return {type: HIDE_MENU};
}

export function chouseCategory(indexCategory: number): IAction {
  return {type: CHOUSE_CATEGORY, payload: indexCategory};
}

export function fillArrayWords(words: ICards[]): IAction {
  return {type: FILL_ARRAY_GAME_WORDS, payload: words};
}
