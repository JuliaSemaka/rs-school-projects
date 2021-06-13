import store from '../store/store';
import { render } from './app';
import { DISABLED, GARAGE_PAGE } from './app.config';
import { listenCars } from './garage/cars/listenCars';
import { listenGarage, updateStageGarage, visibleNavigations } from './garage/listenGarage';

export function listenApp(): void {
  visibleNavigations();

  document.body.addEventListener('click', async (event: MouseEvent) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('views-page__garage')) {
      target.setAttribute(DISABLED, 'true');
      document.querySelector('.views-page__winners')?.removeAttribute(DISABLED);
      store.view = 'garage';
      render();

      await fillFields();
    }
    if (target.classList.contains('views-page__winners')) {
      target.setAttribute(DISABLED, 'true');
      document.querySelector('.views-page__garage')?.removeAttribute(DISABLED);
      store.view = 'winner';
      render();
    }
    if (target.classList.contains('prev-button')) {
      if (store.view === GARAGE_PAGE) {
        await updateStageGarage(--store.carsPage);
      } else {
        // --store.winnersPage;
      }
    }
    if (target.classList.contains('next-button')) {
      if (store.view === GARAGE_PAGE) {
        await updateStageGarage(++store.carsPage);
      } else {
        // --store.winnersPage;
      }
    }
  });

  listenGarage();
  listenCars();
}

async function fillFields() {
  store.animation.forEach(item => {
console.log(item);
    const car = document.getElementById(`car-${item.id}`) as HTMLElement;
    (car.querySelector('.car-puth__car') as HTMLElement).style.marginLeft = `${item.dataAnimation.positionCar}%`;
    if (item.dataAnimation.start) {
      (car.querySelector('.start-car') as HTMLElement).removeAttribute(DISABLED);
    } else {
      (car.querySelector('.start-car') as HTMLElement).setAttribute(DISABLED, 'true');
    }
    if (item.dataAnimation.finish) {
      (car.querySelector('.finish-car') as HTMLElement).removeAttribute(DISABLED);
    } else {
      (car.querySelector('.finish-car') as HTMLElement).setAttribute(DISABLED, 'true');
    }


  });
}
