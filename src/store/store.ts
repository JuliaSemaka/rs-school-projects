import { getCars } from '../api/car/apiCar';
import { getWinners } from '../api/winner/apiWinner';
import { IStore } from './store.module';

const store: IStore = {
  carsPage: 1,
  cars: [],
  carsCount: 0,
  winnersPage: 1,
  winners: [],
  winnersCount: 0,
  animation: {},
  view: 'garage',
  sortBy: null,
  sortOrder: null,
};

export async function initStore(): Promise<void> {
  const { items: itemsCars, count: countCars } = await getCars(1);
  store.cars = itemsCars;
  store.carsCount = +countCars;
  const { items: itemsWinners, count: countWinners } = await getWinners(1);
  store.winners = itemsWinners;
  store.winnersCount = +countWinners;
}

export default store;
