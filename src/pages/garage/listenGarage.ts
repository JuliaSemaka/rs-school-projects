import { createCar, getCars, updateCar } from '../../api/car/apiCar';
import { generateRandomCars } from '../../shared/generateRandomCars';
import store from '../../store/store';
import { CARS_PAGE_COUNT } from '../app.config';
import { renderCars } from './cars/renderCars';

export function visibleNavigations(): void {
  const nextButton: HTMLElement = document.querySelector('.next-button') as HTMLElement;
  const prevButton: HTMLElement = document.querySelector('.prev-button') as HTMLElement;

  const lastPage = store.carsPage * CARS_PAGE_COUNT < +store.carsCount;
  if (lastPage) {
    nextButton.removeAttribute('disabled');
  } else {
    nextButton.setAttribute('disabled', 'true');
  }

  const firstPage = store.carsPage > 1;
  if (firstPage) {
    prevButton.removeAttribute('disabled');
  } else {
    prevButton.setAttribute('disabled', 'true');
  }
}

export async function updateStageGarage(carsPage: number): Promise<void> {
  const { count, items } = await getCars(carsPage);
  store.carsCount = +count;
  store.cars = items;
  const carsRender: string = renderCars();
  const cars: HTMLElement = document.getElementById('cars') as HTMLElement;
  cars.innerHTML = carsRender;
  visibleNavigations();
}

export function listenGarage(): void {
  document.body.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('create-car__button')) {
      const inputCreate = document.getElementById('create-car-input') as HTMLInputElement;
      const colorCreate = document.getElementById('create-car-color') as HTMLInputElement;

      if (!inputCreate.value) {
        inputCreate.classList.add('error');
      } else {
        inputCreate.classList.remove('error');
        await createCar({ name: inputCreate.value, color: colorCreate.value });
        await updateStageGarage(store.carsPage);

        inputCreate.value = '';
      }
    }
    if (target.classList.contains('generate-cars')) {
      const newCars = generateRandomCars();
      for await (const item of newCars) {
        createCar(item);
      }
      await updateStageGarage(store.carsPage);
    }
  });
}

export async function clearFieldsUpdateCar(): Promise<void> {
  const carInput = document.getElementById('update-car-input') as HTMLInputElement;
  const carColor = document.getElementById('update-car-color') as HTMLInputElement;
  const carButton = document.querySelector('.update-car__button');
  carInput.value = '';
  carColor.value = '#ffffff';
  carButton?.removeAttribute('data-idcar');
  carInput?.setAttribute('disabled', 'true');
  carColor?.setAttribute('disabled', 'true');
  carButton?.setAttribute('disabled', 'true');
}

export async function carUpdate(idCar: string, nameCar: string, colorCar: string): Promise<void> {
  const carInput = document.getElementById('update-car-input') as HTMLInputElement;
  carInput.value = nameCar;
  carInput.removeAttribute('disabled');

  const carColor = document.getElementById('update-car-color') as HTMLInputElement;
  carColor.value = colorCar;
  carColor.removeAttribute('disabled');

  const carButton = document.querySelector('.update-car__button');
  carButton?.setAttribute('data-idcar', idCar);
  carButton?.removeAttribute('disabled');
  carButton?.addEventListener('click', async () => {
    const data = {
      name: carInput.value,
      color: carColor.value,
    };
    await updateCar(+idCar, data);
    await updateStageGarage(store.carsPage);
    clearFieldsUpdateCar();
  });
}
