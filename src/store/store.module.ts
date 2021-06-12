import { ICarsResponse } from '../api/car/apiCar.model';
import { IWinnerResponse } from '../api/winner/apiWinner.model';

export interface IStore {
  carsPage: number,
  cars: ICarsResponse[],
  carsCount: number,
  winnersPage: number,
  winners: IWinnerResponse[],
  winnersCount: number,
  animation: IAnimation[],
  view: 'garage' | 'winner',
  sortBy: null,
  sortOrder: null,
}

export interface IAnimation {
  id: string,
  idAnimation: number,
  positionCar: number
}
