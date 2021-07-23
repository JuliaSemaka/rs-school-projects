import { CHANGE_MAIN_PAGE, CHANGE_MODE, CHANGE_STATISTICS_PAGE, CHOOSE_CATEGORY, CLEAR_CARDS, CLEAR_CATEGORIES, CREATE_CARD, CREATE_CATEGORY, DELETE_CARD, DELETE_CATEGORY, FILL_ARRAY_GAME_WORDS, GET_CARDS, GET_CARDS_PAGE, GET_CATEGORIES, GET_CATEGORIES_PAGE, HIDE_MENU, IAction, ICards, ICardsState, SET_LENGTH_CARDS, SET_LENGTH_CATEGORY, SET_STARS, SHOW_MENU, typePage, UPDATE_CARD, UPDATE_CATEGORY } from './cardReducer.module';

const listCards: ICardsState = {
  categoryCards: [],
  lengthCategory: 0,
  listCards: [],
  lengthCards: [],
  indexCategory: null,
  isModePlay: false,
  isShowLeftMenu: false,
  arrGameWords: [],
  arrStars: [],
  page: typePage.MAIN_PAGE,
  isLoadingData: true,
}

export const cardsReducer = (state: ICardsState = listCards, action: IAction): ICardsState => {
  switch(action.type) {
    case CLEAR_CARDS:
      const newListCards = state.listCards.map((item,i) => i === action.payload ? [] : item);
      return {...state, listCards: newListCards};
    case CLEAR_CATEGORIES:
      return {...state, categoryCards: []};
    case GET_CARDS:
      const newLengthCards: number[] = action.payload.map((element: ICards[]) => element.length);
      return {...state, listCards: action.payload, isLoadingData: !(!!state.categoryCards.length), lengthCards: newLengthCards};
    case GET_CARDS_PAGE:
      const listCards = state.listCards.map((item,i) => i === action.payload.indexCategory ? [...state.listCards[action.payload.indexCategory], ...action.payload.data] : item);
      return {...state, listCards: listCards, isLoadingData: !(!!state.categoryCards.length)};
    case GET_CATEGORIES:
      return {...state, categoryCards: action.payload, isLoadingData: !(!!state.listCards.length), lengthCategory: action.payload.length};
    case GET_CATEGORIES_PAGE:
      return {...state, categoryCards: [...state.categoryCards, ...action.payload], isLoadingData: !(!!state.listCards.length)};
    case DELETE_CARD:
      state.listCards[action.payload.indexCategory].splice(action.payload.indexCard, 1);
      state.lengthCards[action.payload.indexCategory]--;
      return {...state};
    case DELETE_CATEGORY:
      state.categoryCards.splice(action.payload, 1);
      state.listCards.splice(action.payload, 1);
      return {...state, lengthCategory: state.lengthCategory - 1};
    case CREATE_CARD:
      state.listCards[action.payload.indexCategory].push(action.payload.data);
      state.lengthCards[action.payload.indexCategory]++;
      return {...state};
    case CREATE_CATEGORY:
      state.categoryCards.push(action.payload);
      state.listCards.push([]);
      state.lengthCategory++;
      state.lengthCards = [...state.lengthCards, 0];
      return {...state};
    case UPDATE_CARD:
      state.listCards[action.payload.indexCategory][action.payload.indexCard] = action.payload.data;
      return {...state};
    case UPDATE_CATEGORY:
      state.categoryCards[action.payload.indexCategory] = action.payload.nameCategory;
      return {...state};
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
    case SET_LENGTH_CARDS:
      return {...state, lengthCards: action.payload.map((element: ICards[]) => element.length)};
    case SET_LENGTH_CATEGORY:
      return {...state, lengthCategory: action.payload.length};
    default:
      return state;
  }
}
