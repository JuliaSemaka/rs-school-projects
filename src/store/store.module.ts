import { ICarsResponse } from '../api/car/apiCar.model';
import { IWinnerResponse } from '../api/winner/apiWinner.model';
import { IFrameId } from '../pages/garage/cars/cars.model';

export interface IStore {
  carsPage: number,
  cars: ICarsResponse[],
  carsCount: number,
  winnersPage: number,
  winners: IWinnerResponse[],
  winnersCount: number,
  animation: IAnimation[],
  view: 'garage' | 'winner',
  sortBy: string,
  sortOrder: string,
}
export interface IAnimation {
  id: string,
  dataAnimation: IFrameId,
}
