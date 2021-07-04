import { CHANGE_MAIN_PAGE, CHANGE_MODE, CHANGE_STATISTICS_PAGE, CHOUSE_CATEGORY, FILL_ARRAY_GAME_WORDS, HIDE_MENU, IAction, ICards, SET_STARS, SHOW_MENU, Stars } from "../reducers/cardReducer.module";

export function changeMode(): IAction {
  return {type: CHANGE_MODE};
}

export function changeMainPage(): IAction {
  return {type: CHANGE_MAIN_PAGE};
}

export function changeStatisticsPage(): IAction {
  return {type: CHANGE_STATISTICS_PAGE};
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

export function setStars(star: Stars): IAction {
  return {type: SET_STARS, payload: star};
}
