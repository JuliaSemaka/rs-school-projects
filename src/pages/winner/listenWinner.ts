import { getCar } from '../../api/car/apiCar';
import { getWinners } from '../../api/winner/apiWinner';
import { IWinnerResponse } from '../../api/winner/apiWinner.model';
import store from '../../store/store';
import { DISABLED, WINNER_PAGE_COUNT } from '../app.config';
import { renderWinner } from './renderWinner';

export function visibleNavigationsWinner(): void {
  const nextButton: HTMLElement = document.querySelector('.next-button') as HTMLElement;
  const prevButton: HTMLElement = document.querySelector('.prev-button') as HTMLElement;

  const lastPage: boolean = store.winnersPage * WINNER_PAGE_COUNT < +store.winnersCount;
  if (lastPage) {
    nextButton.removeAttribute(DISABLED);
  } else {
    nextButton.setAttribute(DISABLED, DISABLED);
  }

  const firstPage: boolean = store.winnersPage > 1;
  if (firstPage) {
    prevButton.removeAttribute(DISABLED);
  } else {
    prevButton.setAttribute(DISABLED, DISABLED);
  }
}

export async function putWinners(item: IWinnerResponse): Promise<void> {
  store.winnersCar.push(await getCar(item.id));
}

export async function fillWinners(): Promise<void> {
  const { items: itemsWinners, count: countWinners } = await getWinners(store.winnersPage,
    store.sortBy, store.sortOrder);
  store.winners = itemsWinners;
  store.winnersCount = +countWinners;
  store.winnersCar = [];
  for (const item of store.winners) {
    await putWinners(item);
  }
  visibleNavigationsWinner();
}

export async function showWinners(): Promise<void> {
  await fillWinners();

  const winnFragment: HTMLElement = document.querySelector('.package') as HTMLElement;
  winnFragment.innerHTML = renderWinner();
}

export function listenWinner(): void {
  document.body.addEventListener('click', async (event: MouseEvent) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('sort-wins')) {
      store.sortBy = 'wins';
      store.sortOrder = store.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      showWinners();
    }
    if (target.classList.contains('sort-best-time')) {
      store.sortBy = 'time';
      store.sortOrder = store.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      showWinners();
    }
  });
}
