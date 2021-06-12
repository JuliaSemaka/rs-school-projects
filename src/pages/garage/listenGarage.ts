import { createCar, getCars, updateCar } from '../../api/car/apiCar';
import { ICarsResponse } from '../../api/car/apiCar.model';
import { generateRandomCars } from '../../shared/generateRandomCars';
import store from '../../store/store';
import { CARS_PAGE_COUNT, DISABLED } from '../app.config';
import { renderCars } from './cars/renderCars';
import { BASE_COLOR } from './garage.config';

export function visibleNavigations(): void {
  const nextButton: HTMLElement = document.querySelector('.next-button') as HTMLElement;
  const prevButton: HTMLElement = document.querySelector('.prev-button') as HTMLElement;

  const lastPage = store.carsPage * CARS_PAGE_COUNT < +store.carsCount;
  if (lastPage) {
    nextButton.removeAttribute(DISABLED);
  } else {
    nextButton.setAttribute(DISABLED, 'true');
  }

  const firstPage = store.carsPage > 1;
  if (firstPage) {
    prevButton.removeAttribute(DISABLED);
  } else {
    prevButton.setAttribute(DISABLED, 'true');
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
  carColor.value = BASE_COLOR;
  carButton?.removeAttribute('data-idcar');
  carInput?.setAttribute(DISABLED, 'true');
  carColor?.setAttribute(DISABLED, 'true');
  carButton?.setAttribute(DISABLED, 'true');
}

export async function carUpdate(idCar: string, nameCar: string, colorCar: string): Promise<void> {
  const carInput = document.getElementById('update-car-input') as HTMLInputElement;
  carInput.value = nameCar;
  carInput.removeAttribute(DISABLED);

  const carColor = document.getElementById('update-car-color') as HTMLInputElement;
  carColor.value = colorCar;
  carColor.removeAttribute(DISABLED);

  const carButton = document.querySelector('.update-car__button');
  carButton?.setAttribute('data-idcar', idCar);
  carButton?.removeAttribute(DISABLED);
  carButton?.addEventListener('click', async () => {
    const data = {
      name: carInput.value,
      color: carColor.value,
    };

    const updCar: ICarsResponse = await updateCar(+idCar, data);

    await updateOneCar(updCar);
    await clearFieldsUpdateCar();
  });
}

async function updateOneCar(data: ICarsResponse) {
  const carEl = (document.getElementById(`car-${data.id}`) as HTMLElement);

  (carEl.querySelector('.car-brand') as HTMLElement).innerHTML = data.name;
  (carEl.querySelector('.car-puth__car') as HTMLElement).setAttribute('data-color', data.color);
}
