import {cards, listcards} from '../../package/cards'
import { CHANGE_MAIN_PAGE, CHANGE_MODE, CHANGE_STATISTICS_PAGE, CHOOSE_CATEGORY, FILL_ARRAY_GAME_WORDS, HIDE_MENU, IAction, ICardsState, SET_STARS, SHOW_MENU, typePage } from './cardReducer.module';

const listCards: ICardsState = {
  categoryCards: cards,
  listCards: listcards,
  indexCategory: null,
  isModePlay: false,
  isShowLeftMenu: false,
  arrGameWords: [],
  arrStars: [],
  page: typePage.MAIN_PAGE,
}

export const cardsReducer = (state: ICardsState = listCards, action: IAction): ICardsState => {
  switch(action.type) {
    case CHANGE_MODE:
      return {...state, isModePlay: !state.isModePlay, arrGameWords: [], arrStars: []};
    case CHANGE_MAIN_PAGE:
      return {...state, indexCategory: null, isShowLeftMenu: false, page: typePage.MAIN_PAGE, arrGameWords: [], arrStars: []};
    case CHANGE_STATISTICS_PAGE:
      return {...state, indexCategory: null, isShowLeftMenu: false, page: typePage.STATISTICS_PAGE, arrGameWords: [], arrStars: []};
    case CHOOSE_CATEGORY:
      return {...state, indexCategory: action.payload, page: typePage.CATEGORIES_PAGE, arrGameWords: [], arrStars: []};
    case FILL_ARRAY_GAME_WORDS:
      if(action.payload.length === 0) {
        return {...state, arrGameWords: action.payload, arrStars: []};
      }
      return {...state, arrGameWords: action.payload};
    case SET_STARS:
      state.arrStars.push(action.payload);
      return {...state, arrStars: state.arrStars};
    case SHOW_MENU:
      return {...state, isShowLeftMenu: !state.isShowLeftMenu};
    case HIDE_MENU:
      return {...state, isShowLeftMenu: false};
    default:
      return state;
  }
}
