import store from '../store/store';
import { render } from './app';
import { DISABLED, GARAGE_PAGE } from './app.config';
import {
  emptyTextWinner, initialSettings, listenCars, updateStageGarage, visibleNavigations,
} from './garage/cars/listenCars';
import { listenGarage, resetAll } from './garage/listenGarage';
import {
  fillWinners, listenWinner, showWinners, visibleNavigationsWinner,
} from './winner/listenWinner';

async function fillFields(): Promise<void> {
  const raceAll: boolean = store.driveAnimation.race;
  const resAll: boolean = store.driveAnimation.reset;

  store.animation.forEach((item) => {
    const car: HTMLElement = document.getElementById(`car-${item.id}`) as HTMLElement;
    (car?.querySelector('.car-puth__car') as HTMLElement).style.marginLeft = `${item.dataAnimation.positionCar}%`;
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
  });
  if (resAll) {
    (document.querySelector('.reset-all') as HTMLElement).removeAttribute(DISABLED);
  } else {
    (document.querySelector('.reset-all') as HTMLElement).setAttribute(DISABLED, DISABLED);
  }
  if (raceAll) {
    (document.querySelector('.race-all') as HTMLElement).removeAttribute(DISABLED);
  } else {
    (document.querySelector('.race-all') as HTMLElement).setAttribute(DISABLED, DISABLED);
  }
  const winnerElement: HTMLElement = document.querySelector('.winner-element') as HTMLElement;

  if (store.showTextWinner) {
    winnerElement.style.display = 'flex';
  }
}

export function listenApp(): void {
  visibleNavigations();
  document.body.addEventListener('click', async (event: MouseEvent) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('views-page__garage')) {
      store.view = 'garage';
      render();
      await fillFields();
      visibleNavigations();
    }
    if (target.classList.contains('views-page__winners')) {
      await fillWinners();
      store.view = 'winner';
      render();
      visibleNavigationsWinner();
    }
    if (target.classList.contains('prev-button')) {
      if (store.view === GARAGE_PAGE) {
        await updateStageGarage(--store.carsPage);
        emptyTextWinner();
        resetAll();
        initialSettings();
      } else {
        store.winnersPage--;
        await showWinners();
      }
    }
    if (target.classList.contains('next-button')) {
      if (store.view === GARAGE_PAGE) {
        await updateStageGarage(++store.carsPage);
        emptyTextWinner();
        resetAll();
        initialSettings();
      } else {
        store.winnersPage++;
        await showWinners();
      }
    }
  });

  listenGarage();
  listenCars();
  listenWinner();
}
