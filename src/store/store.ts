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
  driveAnimation: { race: true, reset: false },
  view: 'garage',
  sortBy: 'id',
  sortOrder: 'ASC',
  saveCreate: { color: '', value: '' },
  saveUpdate: { color: '', value: '' },
  showTextWinner: '',
};

export async function initStore(): Promise<void> {
  const { items: itemsCars, count: countCars } = await getCars(1);
  store.cars = itemsCars;
  store.carsCount = +countCars;
}

export default store;
