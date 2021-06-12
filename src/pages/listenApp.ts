import store from '../store/store';
import { render } from './app';
import { GARAGE_PAGE } from './app.config';
import { listenCars } from './garage/cars/listenCars';
import { listenGarage, updateStageGarage, visibleNavigations } from './garage/listenGarage';

export function listenApp(): void {
  visibleNavigations();

  document.body.addEventListener('click', async (event) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('views-page__garage')) {
      store.view = 'garage';
      render();
    }
    if (target.classList.contains('views-page__winners')) {
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
