import { CHANGE_MAIN_PAGE, CHANGE_MODE, CHANGE_STATISTICS_PAGE, CHOOSE_CATEGORY, CREATE_CARD, CREATE_CATEGORY, DELETE_CARD, DELETE_CATEGORY, FILL_ARRAY_GAME_WORDS, GET_CARDS, GET_CATEGORIES, HIDE_MENU, IAction, ICards, SET_STARS, SHOW_MENU, Stars } from "../reducers/cardReducer.module";
import {Dispatch} from "redux";

enum Links {
  cards = 'https://mysterious-falls-98420.herokuapp.com/api/cards',
  categories = 'https://mysterious-falls-98420.herokuapp.com/api/categories',
}

export function getCards() {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      const response: Response = await fetch(Links.cards);
      dispatch({type: GET_CARDS, payload: (await response.json())});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function getCategories() {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      const response: Response = await fetch(Links.categories);
      dispatch({type: GET_CATEGORIES, payload: (await response.json())});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function deleteCard(indexCategory: number, indexCard: number) {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(`${Links.cards}/${indexCategory}/${indexCard}`, {
        method: 'DELETE',
      });
      dispatch({type: DELETE_CARD, payload: {indexCategory, indexCard}});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function deleteCategory(index: number) {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(`${Links.categories}/${index}`, {
        method: 'DELETE',
      });
      dispatch({type: DELETE_CATEGORY, payload: index});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function createCard(indexCategory: number, data: ICards) {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(Links.cards, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({indexCategory, data}),
      });
      dispatch({type: CREATE_CARD, payload: {indexCategory, data}});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function createCategory(nameCategory: string) {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(Links.categories, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({nameCategory}),
      });
      dispatch({type: CREATE_CATEGORY, payload: nameCategory});
    } catch (e) {
      throw Error(e);
    }
  }
}

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

export function chooseCategory(indexCategory: number): IAction {
  return {type: CHOOSE_CATEGORY, payload: indexCategory};
}

export function fillArrayWords(words: ICards[]): IAction {
  return {type: FILL_ARRAY_GAME_WORDS, payload: words};
}

export function setStars(star: Stars): IAction {
  return {type: SET_STARS, payload: star};
}
