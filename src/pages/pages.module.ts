export enum EKeysStatistics{
    word = 'word',
    translation = 'translation',
    category = 'category',
    clicks = 'clicks',
    correct = 'correct',
    wrong = 'wrong',
    procent = 'procent',
}

export interface IWordsPage{
  category: string;
  words: string;
}
