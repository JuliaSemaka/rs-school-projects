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
      store.view = 'garage';
      await render();
      console.log(document.querySelectorAll('.cat'));

      await fillFields();
    }
    if (target.classList.contains('views-page__winners')) {
      store.view = 'winner';
      await render();
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
    const img: HTMLElement = document.getElementById(`cat-${item.id}`) as HTMLElement;
    console.log(img);

    if (img) {
      (img.querySelector('.start-car') as HTMLElement).setAttribute(DISABLED, 'true');
      (img.querySelector('.finish-car') as HTMLElement).removeAttribute(DISABLED);
    }
  });
}
