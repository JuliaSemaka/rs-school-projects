import store from '../../store/store';
import { WINNER_PAGE_COUNT } from '../app.config';
import { renderWinnerLine } from './renderWinnerLine';

export function renderWinner(): string {
  return `<div class="winners">
<p class="text text-title">Winners (<span>${store.winnersCount}</span>)</p>
<p class="text">Page #<span>${store.winnersPage}</span></p>
<div class="winners-table">
  <div class="winners-table__str winners-table__header">
    <div class="text winners-table__item">Number</div>
    <div class="text winners-table__item">Car</div>
    <div class="text winners-table__item">Name</div>
    <div class="text winners-table__item sort-wins">Wins <span>⇳</span></div>
    <div class="text winners-table__item sort-best-time">Best time (second) <span>⇳</span></div>
  </div>
  <fragment>
      ${store.winners.map((item, key) => `
        ${renderWinnerLine((key + 1) + ((store.winnersPage - 1) * WINNER_PAGE_COUNT), item)}
      `).join('')}
    </fragment>
</div>

</div>`;
}
