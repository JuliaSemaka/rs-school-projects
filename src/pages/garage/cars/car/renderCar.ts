import { ICarsResponse } from '../../../../api/car/apiCar.model';
import { packageCar } from '../../../../shared/packageCar';

export function renderCar(car: ICarsResponse): string {
  return `
  <div class="car" id="car-${car.id}">
    <div class="car-settings">
      <input type="button" class="button button-green text-button select-car" value="Select">
      <input type="button" class="button button-green text-button remove-car" value="Remove">
      <p class="text text-green car-brand">${car.name}</p>
    </div>
    <div class="car-puth">
      <div class="car-puth__buttons">
        <input type="button" class="button button-white text-button start-car" value="A">
        <input type="button" class="button button-white text-button finish-car" value="B" disabled>
      </div>
      <div class="car-puth__road"><span></span></div>
      <picture class="car-puth__car" data-color="${car.color}">${packageCar(car.color)}</picture>
      <img src="/images/flag.png" class="car-puth__flag" alt="flag">
    </div>
  </div>`;
}
