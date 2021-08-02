import { EKeysStatistics } from '../../pages/pages.module';
import { IAction } from './cardReducer.module';
import {
  ADD_ALL_STATISTIC,
  ADD_CLICK,
  ADD_CORRECT,
  ADD_WRONG,
  IStatisticsFields,
  IStatisticsState,
  KeysStatistics,
  RESET_STATISTICS,
  SORT_STATISTICS,
  typeSort,
} from './statisticsReducer.module';

const baseStatistics: IStatisticsState = {
  fields: [],
  sort: {
    word: typeSort.DESC,
    translation: typeSort.DESC,
    category: typeSort.DESC,
    clicks: typeSort.DESC,
    correct: typeSort.DESC,
    wrong: typeSort.DESC,
    procent: typeSort.DESC,
  },
};

export const statisticsReducer = (
  state: IStatisticsState = baseStatistics,
  action: IAction
): IStatisticsState => {
  switch (action.type) {
    case ADD_ALL_STATISTIC:
      return { ...state, fields: action.payload };
    case RESET_STATISTICS:
      const newStateReset = state.fields.map((item) => {
        item.clicks = '0';
        item.wrong = '0';
        item.correct = '0';
        item.procent = '0';
        return item;
      });
      return { ...state, fields: newStateReset };
    case ADD_CLICK:
      const newStateClick = state.fields.map((item) => {
        if (item.word === action.payload) {
          item.clicks = (parseInt(item.clicks) + 1).toString();
        }
        return item;
      });
      return { ...state, fields: newStateClick };
    case ADD_CORRECT:
      const newStateCorrect = state.fields.map((item) => {
        if (item.word === action.payload) {
          item.correct = (parseInt(item.correct) + 1).toString();
          item.procent = Math.round(
            (100 / (parseInt(item.wrong) + parseInt(item.correct))) *
              parseInt(item.correct)
          ).toString();
        }
        return item;
      });
      return { ...state, fields: newStateCorrect };
    case ADD_WRONG:
      const newStateWrong = state.fields.map((item) => {
        if (item.word === action.payload) {
          item.wrong = (parseInt(item.wrong) + 1).toString();
          item.procent = Math.round(
            (100 / (parseInt(item.wrong) + parseInt(item.correct))) *
              parseInt(item.correct)
          ).toString();
        }
        return item;
      });
      return { ...state, fields: newStateWrong };
    case SORT_STATISTICS:
      const key: KeysStatistics = action.payload;
      let sortArray: IStatisticsFields[] = [];
      if (state.sort[key] === typeSort.DESC) {
        if (
          key === EKeysStatistics.category ||
          key === EKeysStatistics.translation ||
          key === EKeysStatistics.word
        ) {
          sortArray = state.fields.sort((a, b) =>
            a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
          );
        } else {
          sortArray = state.fields.sort(
            (a, b) => Number(a[key]) - Number(b[key])
          );
        }
        state.sort[key] = typeSort.ASC;
      } else {
        if (
          key === EKeysStatistics.category ||
          key === EKeysStatistics.translation ||
          key === EKeysStatistics.word
        ) {
          sortArray = state.fields.sort((a, b) =>
            a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0
          );
        } else {
          sortArray = state.fields.sort(
            (a, b) => Number(b[key]) - Number(a[key])
          );
        }
        state.sort[key] = typeSort.DESC;
      }
      return { fields: sortArray, sort: state.sort };
    default:
      return state;
  }
};
