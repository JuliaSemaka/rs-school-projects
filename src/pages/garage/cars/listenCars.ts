import { deleteCar } from '../../../api/car/apiCar';
import store from '../../../store/store';
import { carUpdate, updateStageGarage } from '../listenGarage';

export function listenCars(): void {
  document.body.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('select-car')) {
      const carParrent = target.closest('.car');
      const idCar: string = carParrent?.getAttribute('data-id') as string;
      const colorCar: string = carParrent?.querySelector('.car-puth__car')?.getAttribute('data-color') as string;
      const nameCar: string = (carParrent?.querySelector('.car-brand') as HTMLInputElement).textContent as string;
      carUpdate(idCar, nameCar, colorCar);
    }
    if (target.classList.contains('remove-car')) {
      const idCar: number = +(target.closest('.car')?.getAttribute('data-id') as string);
      await deleteCar(idCar);
      await updateStageGarage(store.carsPage);
    }
  });
}
