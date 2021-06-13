import { createCar, getCars, updateCar } from '../../api/car/apiCar';
import { ICarsResponse, ICreateCarParams } from '../../api/car/apiCar.model';
import { driveCarsEngine, startCarsEngine } from '../../api/engine/apiEngine';
import { generateRandomCars } from '../../shared/generateRandomCars';
import { packageCar } from '../../shared/packageCar';
import store from '../../store/store';
import { CARS_PAGE_COUNT, DISABLED } from '../app.config';
import { renderCar } from './cars/car/renderCar';
import { animationCar, cancelAnimation } from './cars/listenCars';
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
        const objData: ICreateCarParams = { name: inputCreate.value, color: colorCreate.value };
        const newCar: ICarsResponse = await createCar(objData);

        (document.getElementById('cars-count') as HTMLElement).innerHTML = `${++store.carsCount}`;
        if (store.cars.length < CARS_PAGE_COUNT) {
          store.cars.push(newCar);
          const carView = renderCar(newCar);
          const carsBlokc = document.querySelector('.cars__item fragment') as HTMLElement;
          carsBlokc.insertAdjacentHTML('beforeend', carView);
        }
        visibleNavigations();
        inputCreate.value = '';
      }
    }
    if (target.classList.contains('update-car__button')) {
      const carInput = document.getElementById('update-car-input') as HTMLInputElement;
      const carColor = document.getElementById('update-car-color') as HTMLInputElement;
      const data = {
        name: carInput.value,
        color: carColor.value,
      };

      const idCar: string = (event.target as HTMLElement).getAttribute('data-idcar') as string;
      const updCar: ICarsResponse = await updateCar(+idCar, data);

      await updateOneCar(updCar);
      await clearFieldsUpdateCar();
    }
  });

  listenAllCars();
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
}

async function updateOneCar(data: ICarsResponse) {
  const carEl = (document.getElementById(`car-${data.id}`) as HTMLElement);

  (carEl.querySelector('.car-brand') as HTMLElement).innerHTML = data.name;
  const carColor = carEl.querySelector('.car-puth__car') as HTMLElement;
  carColor.setAttribute('data-color', data.color);
  carColor.innerHTML = packageCar(data.color);
}

function listenAllCars() {
  document.body.addEventListener('click', async (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('generate-cars')) {
    const newCars = generateRandomCars();
    for await (const item of newCars) {
      createCar(item);
    }
    await updateStageGarage(store.carsPage);
  }
  if (target.classList.contains('race-all')) {
    target.setAttribute(DISABLED, 'true');

    const promises = store.cars.map(item => {
      const carEl = document.getElementById(`car-${item.id}`) as HTMLElement;
      (carEl.querySelector('.start-car') as HTMLElement).setAttribute(DISABLED, 'true');
      return startCarsEngine(item.id)
    });
    Promise.all(promises).then(function(response){
      response.forEach(async (item,key) => {
        const dataAnimation = await animationCar(`${store.cars[key].id}`, item.distance, item.velocity);
        const carEl = document.getElementById(`car-${store.cars[key].id}`) as HTMLElement;
        (document.querySelector('.reset-all') as HTMLElement)?.removeAttribute(DISABLED);
        (carEl?.querySelector('.finish-car') as HTMLElement)?.removeAttribute(DISABLED);

        store.animation.push({
          id: `${store.cars[key].id}`,
          dataAnimation: dataAnimation,
        });

        const { success } = await driveCarsEngine(store.cars[key].id);
        if (!success) {
          cancelAnimationFrame(dataAnimation.id);
        }
        (carEl.querySelector('.start-car') as HTMLElement).removeAttribute(DISABLED);
        dataAnimation.start = true;
        (carEl?.querySelector('.finish-car') as HTMLElement)?.removeAttribute(DISABLED);
        const allCarsStart: NodeListOf<Element> = document.querySelectorAll('.start-car');
        let isAllFinish = true;
        allCarsStart.forEach(item => {
          if (item.getAttribute(DISABLED)) {
            isAllFinish = false;
          }
        });

        if (isAllFinish) {
          (document.querySelector('.race-all') as HTMLElement)?.removeAttribute(DISABLED);
        }
      })
    });
  }
  if (target.classList.contains('reset-all')) {
    store.animation.forEach( async item => {
      cancelAnimation(item.id, item.dataAnimation.id);
      const carEl = document.getElementById(`car-${item.id}`) as HTMLElement;
      (carEl.querySelector('.finish-car') as HTMLElement).setAttribute(DISABLED, 'true');
    });
    target.setAttribute(DISABLED, 'true');
  }
  })
}
