import { IAction } from '../reducers/cardReducer.module';
import {
  ADD_ALL_STATISTIC,
  ADD_CLICK,
  ADD_CORRECT,
  ADD_WRONG,
  IStatisticsFields,
  RESET_STATISTICS,
  SORT_STATISTICS,
} from '../reducers/statisticsReducer.module';

export function addAllStatistic(statistics: IStatisticsFields[]): IAction {
  return { type: ADD_ALL_STATISTIC, payload: statistics };
}

export function addClick(word: string): IAction {
  return { type: ADD_CLICK, payload: word };
}

export function addCorrect(word: string): IAction {
  return { type: ADD_CORRECT, payload: word };
}

export function addWrong(word: string): IAction {
  return { type: ADD_WRONG, payload: word };
}

export function resetStatistics(): IAction {
  return { type: RESET_STATISTICS };
}

export function sortStatistics(field: string): IAction {
  return { type: SORT_STATISTICS, payload: field };
}
