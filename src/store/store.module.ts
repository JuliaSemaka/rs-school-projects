import { ICarsResponse } from '../api/car/apiCar.model';
import { IWinnerResponse } from '../api/winner/apiWinner.model';

export interface IStore {
  carsPage: number,
  cars: ICarsResponse[],
  carsCount: number,
  winnersPage: number,
  winners: IWinnerResponse[],
  winnersCount: number,
  animation: Object,
  view: 'garage' | 'winner',
  sortBy: null,
  sortOrder: null,
}
