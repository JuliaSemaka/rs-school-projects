import store from '../../../store/store';
import { renderCar } from './car/renderCar';

export function renderCars(): string {
  return `
    <p class="text text-title">Garage (<span id="cars-count">${store.carsCount}</span>)</p>
    <p class="text">Page #<span>${store.carsPage}</span></p>
    <div class="cars__item">
      <fragment>
        ${store.cars.map((car) => renderCar(car)).join('')}
      </fragment>
    </div>
  `;
}
