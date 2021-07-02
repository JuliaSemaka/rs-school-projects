import {cards, listcards} from '../../package/cards'
import { CHANGE_MODE, CHOUSE_CATEGORY, FILL_ARRAY_GAME_WORDS, HIDE_MENU, IAction, ICardsState, SHOW_MENU } from './cardReducer.module';

const listCards: ICardsState = {
  categoryCards: cards,
  listCards: listcards,
  indexCategory: null,
  isModePlay: false,
  isShowLeftMenu: false,
  arrGameWords: []
}

export const cardsReducer = (state: ICardsState = listCards, action: IAction): ICardsState => {
  switch(action.type) {
    case CHANGE_MODE:
      return {...state, isModePlay: !state.isModePlay};
    case CHOUSE_CATEGORY:
      return {...state, indexCategory: action.payload};
    case FILL_ARRAY_GAME_WORDS:
      return {...state, arrGameWords: action.payload};
    case SHOW_MENU:
      return {...state, isShowLeftMenu: !state.isShowLeftMenu};
    case HIDE_MENU:
      return {...state, isShowLeftMenu: false};
    default:
      return state;
  }
}
