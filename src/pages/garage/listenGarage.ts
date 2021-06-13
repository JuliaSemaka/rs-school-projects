import { createCar, updateCar } from '../../api/car/apiCar';
import { ICarsResponse, ICreateCarParams } from '../../api/car/apiCar.model';
import { driveCarsEngine, startCarsEngine } from '../../api/engine/apiEngine';
import { IStartResponse } from '../../api/engine/apiEngine.model';
import { generateRandomCars } from '../../shared/generateRandomCars';
import { packageCar } from '../../shared/packageCar';
import store from '../../store/store';
import { IAnimation } from '../../store/store.module';
import { CARS_PAGE_COUNT, DISABLED } from '../app.config';
import { renderCar } from './cars/car/renderCar';
import { MILLISECONDS } from './cars/cars.config';
import { animationCar, cancelAnimation, updateStageGarage } from './cars/listenCars';
import { BASE_COLOR } from './garage.config';

export function visibleNavigations(): void {
  const nextButton: HTMLElement = document.querySelector('.next-button') as HTMLElement;
  const prevButton: HTMLElement = document.querySelector('.prev-button') as HTMLElement;

  const lastPage = store.carsPage * CARS_PAGE_COUNT < +store.carsCount;
  if (lastPage) {
    nextButton.removeAttribute(DISABLED);
  } else {
    nextButton.setAttribute(DISABLED, DISABLED);
  }

  const firstPage = store.carsPage > 1;
  if (firstPage) {
    prevButton.removeAttribute(DISABLED);
  } else {
    prevButton.setAttribute(DISABLED, DISABLED);
  }
}

async function updateOneCar(data: ICarsResponse) {
  const carEl = (document.getElementById(`car-${data.id}`) as HTMLElement);

  (carEl.querySelector('.car-brand') as HTMLElement).innerHTML = data.name;
  const carColor = carEl.querySelector('.car-puth__car') as HTMLElement;
  carColor.setAttribute('data-color', data.color);
  carColor.innerHTML = packageCar(data.color);
}

export async function clearFieldsUpdateCar(): Promise<void> {
  const carInput: HTMLInputElement = document.getElementById('update-car-input') as HTMLInputElement;
  const carColor: HTMLInputElement = document.getElementById('update-car-color') as HTMLInputElement;
  const carButton: HTMLElement = document.querySelector('.update-car__button') as HTMLElement;
  carInput.value = '';
  carColor.value = BASE_COLOR;
  carButton?.removeAttribute('data-idcar');
  carInput?.setAttribute(DISABLED, DISABLED);
  carColor?.setAttribute(DISABLED, DISABLED);
  carButton?.setAttribute(DISABLED, DISABLED);
}

function listenAllCars() {
  document.body.addEventListener('click', async (event) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('generate-cars')) {
      const newCars: ICreateCarParams[] = generateRandomCars();
      newCars.forEach(async (item) => createCar(item));
      await updateStageGarage(store.carsPage);
    }
    if (target.classList.contains('race-all')) {
      target.setAttribute(DISABLED, DISABLED);

      const promises: Promise<IStartResponse>[] = store.cars.map((item) => {
        const carEl: HTMLElement = document.getElementById(`car-${item.id}`) as HTMLElement;
        (carEl.querySelector('.start-car') as HTMLElement).setAttribute(DISABLED, DISABLED);
        return startCarsEngine(item.id);
      });
      let isWinner = false;
      Promise.all(promises).then((response) => {
        response.forEach(async (item, key) => {
          const dataAnimation = await animationCar(`${store.cars[key].id}`, item.distance, item.velocity);
          const carEl: HTMLElement = document.getElementById(`car-${store.cars[key].id}`) as HTMLElement;
          (document.querySelector('.reset-all') as HTMLElement)?.removeAttribute(DISABLED);
          (carEl?.querySelector('.finish-car') as HTMLElement)?.removeAttribute(DISABLED);

          store.animation.push({
            id: `${store.cars[key].id}`,
            dataAnimation,
          });

          const { success } = await driveCarsEngine(store.cars[key].id);
          if (!success) {
            cancelAnimationFrame(dataAnimation.id);
          } else if (!isWinner) {
            isWinner = true;
            const time: number = item.distance / item.velocity / MILLISECONDS;
            const winnerElement: HTMLElement = document.querySelector('.winner-element') as HTMLElement;
            winnerElement.innerHTML = `<p>${store.cars[key].name} went first [${time.toFixed(2)}s]</p>`;
            winnerElement.style.display = 'flex';
          }
          store.animation = store.animation.map((elem: IAnimation) => {
            if (+elem.id === store.cars[key].id) {
              elem.dataAnimation.drive = false;
            }
            return elem;
          });
          if ((document.getElementById(`stop${store.cars[key].id}`) as HTMLElement)?.getAttribute(DISABLED)) {
            (document.getElementById(`start${store.cars[key].id}`) as HTMLElement)?.removeAttribute(DISABLED);
          }

          const allCarsStart: NodeListOf<Element> = document.querySelectorAll('.start-car');
          let isAllFinish = true;
          allCarsStart.forEach((el: Element) => {
            if (el.getAttribute(DISABLED)) {
              isAllFinish = false;
            }
          });

          if (isAllFinish) {
            (document.querySelector('.race-all') as HTMLElement)?.removeAttribute(DISABLED);
          }
        });
      });
    }
    if (target.classList.contains('reset-all')) {
      (document.querySelector('.winner-element') as HTMLElement).style.display = 'none';

      store.animation.forEach(async (item) => {
        cancelAnimation(item.id, item.dataAnimation.id);
        (document.getElementById(`stop${item.id}`) as HTMLElement)?.setAttribute(DISABLED, DISABLED);
        if (!item.dataAnimation.drive) {
          (document.getElementById(`start${item.id}`) as HTMLElement)?.removeAttribute(DISABLED);
        }
      });
      target.setAttribute(DISABLED, DISABLED);
    }
  });
}

export function listenGarage(): void {
  document.body.addEventListener('click', async (event) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('create-car__button')) {
      const inputCreate: HTMLInputElement = document.getElementById('create-car-input') as HTMLInputElement;
      const colorCreate: HTMLInputElement = document.getElementById('create-car-color') as HTMLInputElement;

      if (!inputCreate.value) {
        inputCreate.classList.add('error');
      } else {
        inputCreate.classList.remove('error');
        const objData: ICreateCarParams = { name: inputCreate.value, color: colorCreate.value };
        const newCar: ICarsResponse = await createCar(objData);

        (document.getElementById('cars-count') as HTMLElement).innerHTML = `${++store.carsCount}`;
        if (store.cars.length < CARS_PAGE_COUNT) {
          store.cars.push(newCar);
          const carView: string = renderCar(newCar);
          const carsBlokc: HTMLElement = document.querySelector('.cars__item fragment') as HTMLElement;
          carsBlokc.insertAdjacentHTML('beforeend', carView);
        }
        visibleNavigations();
        inputCreate.value = '';
      }
    }
    if (target.classList.contains('update-car__button')) {
      const carInput: HTMLInputElement = document.getElementById('update-car-input') as HTMLInputElement;
      const carColor: HTMLInputElement = document.getElementById('update-car-color') as HTMLInputElement;
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
