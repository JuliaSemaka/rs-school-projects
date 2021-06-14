import { getWinners } from '../api/winner/apiWinner';
import store from '../store/store';
import { render } from './app';
import { DISABLED, GARAGE_PAGE } from './app.config';
import { listenCars, updateStageGarage } from './garage/cars/listenCars';
import { listenGarage, visibleNavigations } from './garage/listenGarage';

async function fillFields() {
  let raceAll = true;
  let resetAll = true;
  store.animation.forEach((item) => {
    const car = document.getElementById(`car-${item.id}`) as HTMLElement;
    (car.querySelector('.car-puth__car') as HTMLElement).style.marginLeft = `${item.dataAnimation.positionCar}%`;
    if (item.dataAnimation.start) {
      (car.querySelector('.start-car') as HTMLElement).removeAttribute(DISABLED);
    } else {
      (car.querySelector('.start-car') as HTMLElement).setAttribute(DISABLED, DISABLED);
    }
    if (item.dataAnimation.finish) {
      (car.querySelector('.finish-car') as HTMLElement).removeAttribute(DISABLED);
    } else {
      (car.querySelector('.finish-car') as HTMLElement).setAttribute(DISABLED, DISABLED);
    }
    if (!item.dataAnimation.finish) {
      resetAll = false;
    }
    if (!item.dataAnimation.start) {
      raceAll = false;
    }
  });
  if (resetAll) {
    (document.querySelector('.reset-all') as HTMLElement).removeAttribute(DISABLED);
  } else {
    (document.querySelector('.reset-all') as HTMLElement).setAttribute(DISABLED, DISABLED);
  }
  if (raceAll) {
    (document.querySelector('.race-all') as HTMLElement).removeAttribute(DISABLED);
  } else {
    (document.querySelector('.race-all') as HTMLElement).setAttribute(DISABLED, DISABLED);
  }
}

export async function fillWinners(): Promise<void> {
  const { items: itemsWinners, count: countWinners } = await getWinners(store.winnersPage, store.sortBy, store.sortOrder);
  store.winners = itemsWinners;
  store.winnersCount = +countWinners;
}

export function listenApp(): void {
  visibleNavigations();

  document.body.addEventListener('click', async (event: MouseEvent) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('views-page__garage')) {
      document.querySelector('.views-page__winners')?.removeAttribute(DISABLED);
      store.view = 'garage';
      render();

      await fillFields();
    }
    if (target.classList.contains('views-page__winners')) {
      await fillWinners();
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
