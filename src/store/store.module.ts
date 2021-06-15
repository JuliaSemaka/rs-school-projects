import { ICarsResponse } from '../api/car/apiCar.model';
import { IWinnerResponse } from '../api/winner/apiWinner.model';
import { IFrame } from '../pages/garage/cars/cars.model';

export interface IStore {
  carsPage: number,
  cars: ICarsResponse[],
  carsCount: number,
  winnersPage: number,
  winners: IWinnerResponse[],
  winnersCar: ICarsResponse[],
  winnersCount: number,
  animation: IAnimation[],
  view: 'garage' | 'winner',
  sortBy: 'id'|'wins'|'time',
  sortOrder: 'ASC'|'DESC',
}
export interface IAnimation {
  id: string,
  dataAnimation: IFrame,
}
