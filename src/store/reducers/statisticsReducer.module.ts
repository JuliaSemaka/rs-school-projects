export const ADD_ALL_STATISTIC = 'ADD_ALL_STATISTIC';
export const ADD_CLICK = 'ADD_CLICK';
export const ADD_CORRECT = 'ADD_CORRECT';
export const ADD_WRONG = 'ADD_WRONG';
export const RESET_STATISTICS = 'RESET_STATISTICS';
export const SORT_STATISTICS = 'SORT_STATISTICS';

export enum typeSort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IStatisticsState {
  fields: IStatisticsFields[];
  sort: IStatisticsFields;
}

export interface IStatisticsFields {
  word: string;
  translation: string;
  category: string;
  clicks: string;
  correct: string;
  wrong: string;
  procent: string;
}

export type KeysStatistics = keyof IStatisticsFields;
