import { CHANGE_MODE, CHOUSE_CATEGORY, HIDE_MENU, IAction, SHOW_MENU } from "../reducers/cardReducer.module";

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
