import { getWinners } from '../../api/winner/apiWinner';
import store from '../../store/store';
import { renderWinner } from './renderWinner';

export async function fillWinners(): Promise<void> {
  const { items: itemsWinners, count: countWinners } = await getWinners(store.winnersPage,
    store.sortBy, store.sortOrder);
  store.winners = itemsWinners;
  store.winnersCount = +countWinners;
  const winnFragment: HTMLElement = document.querySelector('.package') as HTMLElement;
  winnFragment.innerHTML = renderWinner();
}

export function listenWinner(): void {
  document.body.addEventListener('click', async (event: MouseEvent) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('sort-wins')) {
      store.sortBy = 'wins';
      store.sortOrder = store.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      fillWinners();
    }
    if (target.classList.contains('sort-best-time')) {
      store.sortBy = 'time';
      store.sortOrder = store.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      fillWinners();
    }
  });
}
