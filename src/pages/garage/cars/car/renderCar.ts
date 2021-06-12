import { ICarsResponse } from '../../../../api/car/apiCar.model';

export function renderCar(car: ICarsResponse): string {
  return `
  <div class="car" data-id="${car.id}">
    <div class="car-settings">
      <input type="button" class="button button-green text-button select-car" value="Select">
      <input type="button" class="button button-green text-button remove-car" value="Remove">
      <p class="text text-green car-brand">${car.name}</p>
    </div>
    <div class="car-puth">
      <div class="car-puth__buttons">
        <input type="button" class="button button-white text-button" value="A">
        <input type="button" class="button button-white text-button" value="B" disabled>
      </div>
      <div class="car-puth__road"><span></span></div>
      <img src="./images/car.svg" class="car-puth__car" alt="car" data-color="${car.color}">
      <img src="/images/flag.png" class="car-puth__flag" alt="flag">
    </div>
  </div>`;
}
