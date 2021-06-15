import { getCars } from '../api/car/apiCar';
import { IStore } from './store.module';

const store: IStore = {
  carsPage: 1,
  cars: [],
  carsCount: 0,
  winnersPage: 1,
  winners: [],
  winnersCar: [],
  winnersCount: 0,
  animation: [],
  view: 'garage',
  sortBy: 'id',
  sortOrder: 'ASC',
};

export async function initStore(): Promise<void> {
  const { items: itemsCars, count: countCars } = await getCars(1);
  store.cars = itemsCars;
  store.carsCount = +countCars;
}

export default store;
