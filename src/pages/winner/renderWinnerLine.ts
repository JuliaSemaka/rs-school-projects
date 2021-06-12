import { IWinnerResponse } from '../../api/winner/apiWinner.model';

export function renderWinnerLine(data: IWinnerResponse): string {
  return `<div class="winners-table__str">
  <div class="text winners-table__item">${data.id}</div>
  <div class="text winners-table__item">
    <img src="./images/car.svg" class="winners-table__main_img" alt="car">
  </div>
  <div class="text winners-table__item">Tesla</div>
  <div class="text winners-table__item">${data.wins}</div>
  <div class="text winners-table__item">${data.time}</div>
  </div>`;
}
