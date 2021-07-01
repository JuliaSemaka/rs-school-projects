import {cards, listcards} from '../../package/cards'
import { CHANGE_MODE, CHOUSE_CATEGORY, IAction, ICardsState, SHOW_MENU } from './cardReducer.module';

const listCards: ICardsState = {
  categoryCards: cards,
  listCards: listcards,
  indexCategory: null,
  isModePlay: false,
  isShowLeftMenu: false,
}

export const cardsReducer = (state: ICardsState = listCards, action: IAction): ICardsState => {
  switch(action.type) {
    case CHANGE_MODE:
      return {...state, isModePlay: !state.isModePlay, isShowLeftMenu: false};
    case CHOUSE_CATEGORY:
      return {...state, indexCategory: action.payload, isShowLeftMenu: false};
    case SHOW_MENU:
      return {...state, isShowLeftMenu: !state.isShowLeftMenu};
    default:
      return state;
  }
}
