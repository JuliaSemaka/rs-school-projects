import store from '../../store/store';
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
    <div class="text winners-table__item">Wins</div>
    <div class="text winners-table__item">Best time (second)</div>
  </div>
  <fragment>
      ${store.winners.map((item) => `
        ${renderWinnerLine(item)}
      `).join('')}
    </fragment>
</div>

</div>`;
}
