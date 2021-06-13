import store from '../store/store';
import { GARAGE_PAGE } from './app.config';
import { renderGarage } from './garage/renderGarage';
import { renderWinner } from './winner/renderWinner';

export function render(): void {
  const app = `<header class="header text text-uppercase">${store.view}</header>
  <main class="main-wrapper">
    <div class="views-page">
      <button type="button" class="button button-green text-button views-page__garage">To Garage</button>
      <button type="button" class="button button-green text-button views-page__winners">To Winners</button>
    </div>

    ${(store.view === GARAGE_PAGE) ? renderGarage() : renderWinner()}

    <div class="navigation">
      <button type="button" class="button button-white text-button prev-button">Prev</button>
      <button type="button" class="button button-white text-button next-button">Next</button>
    </div>
  </main>`;

  document.body.innerHTML = app;
}
