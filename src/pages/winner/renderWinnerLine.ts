import { IWinnerResponse } from '../../api/winner/apiWinner.model';
import { packageCar } from '../../shared/packageCar';
import store from '../../store/store';

export function renderWinnerLine(key: number, data: IWinnerResponse): string {
  return `<div class="winners-table__str">
  <div class="text winners-table__item">${key}</div>
  <div class="text winners-table__item winners-table__main_img">
    ${packageCar(store.winnersCar.find((item) => item.id === data.id)?.color as string)}
  </div>
  <div class="text winners-table__item">${store.winnersCar.find((item) => item.id === data.id)?.name}</div>
  <div class="text winners-table__item">${data.wins}</div>
  <div class="text winners-table__item">${data.time}</div>
  </div>`;
}
