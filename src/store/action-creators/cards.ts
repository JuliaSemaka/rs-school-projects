import { CHANGE_MAIN_PAGE, CHANGE_MODE, CHANGE_STATISTICS_PAGE, CHOOSE_CATEGORY, CLEAR_CARDS, CLEAR_CATEGORIES, CREATE_CARD, CREATE_CATEGORY, DELETE_CARD, DELETE_CATEGORY, FILL_ARRAY_GAME_WORDS, GET_CARDS, GET_CARDS_PAGE, GET_CATEGORIES, GET_CATEGORIES_PAGE, HIDE_MENU, IAction, ICards, Links, SET_STARS, SHOW_MENU, Stars, UPDATE_CARD, UPDATE_CATEGORY } from "../reducers/cardReducer.module";
import {Dispatch} from "redux";

export function clearCards(indexCategory: number) {
  return {type: CLEAR_CARDS, payload: indexCategory};
}

export function clearCategories() {
  return {type: CLEAR_CATEGORIES};
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

export function getCardsPage(indexCategory: number, page: number) {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      const response: Response = await fetch(`${Links.cards}/${indexCategory}/${page}`);
      dispatch({type: GET_CARDS_PAGE, payload: ({indexCategory, data: await response.json()})});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function getCategoriesPage(page: number) {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      const response: Response = await fetch(`${Links.categories}/${page}`);
      dispatch({type: GET_CATEGORIES_PAGE, payload: (await response.json())});
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

export function updateCard(indexCategory: number, indexCard: number, data: ICards) {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(Links.cards, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({indexCategory, indexCard, data}),
      });
      dispatch({type: UPDATE_CARD, payload: {indexCategory, indexCard, data}});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function updateCategory(indexCategory: number, nameCategory: string) {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(Links.categories, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({indexCategory, nameCategory}),
      });
      dispatch({type: UPDATE_CATEGORY, payload: {indexCategory, nameCategory}});
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
