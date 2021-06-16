import { ICarsResponse } from '../api/car/apiCar.model';
import { IWinnerResponse } from '../api/winner/apiWinner.model';
import { IFrame } from '../pages/garage/cars/cars.model';

type StoreView = 'garage' | 'winner';
type StoreStoreBy = 'id'|'wins'|'time';
type StoreSortOrder = 'ASC'|'DESC';

export interface IStore {
  carsPage: number,
  cars: ICarsResponse[],
  carsCount: number,
  winnersPage: number,
  winners: IWinnerResponse[],
  winnersCar: ICarsResponse[],
  winnersCount: number,
  animation: IAnimation[],
  view: StoreView,
  sortBy: StoreStoreBy,
  sortOrder: StoreSortOrder,
}

export interface IAnimation {
  id: string,
  dataAnimation: IFrame,
}
