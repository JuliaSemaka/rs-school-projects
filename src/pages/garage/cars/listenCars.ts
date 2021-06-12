import { deleteCar } from '../../../api/car/apiCar';
import { driveCarsEngine, startCarsEngine } from '../../../api/engine/apiEngine';
import store from '../../../store/store';
import { DISABLED } from '../../app.config';
import { carUpdate, updateStageGarage } from '../listenGarage';
import { MILLISECONDS, ONE_SECONDS, PERCENT_ALL, STOPPED } from './cars.config';
import { IFrameId } from './cars.model';

export function listenCars(): void {
  document.body.addEventListener('click', async (event: MouseEvent) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('select-car')) {
      const carParrent: HTMLElement = target.closest('.car') as HTMLElement;
      const idCar: string = carParrent?.id.slice(4);
      const colorCar: string = carParrent?.querySelector('.car-puth__car')?.getAttribute('data-color') as string;
      const nameCar: string = (carParrent?.querySelector('.car-brand') as HTMLInputElement).textContent as string;
      carUpdate(idCar, nameCar, colorCar);
    }
    if (target.classList.contains('remove-car')) {
      const idCar: number = +(target.closest('.car')?.id as string);
      await deleteCar(idCar);
      await updateStageGarage(store.carsPage);
    }
  });

  listenCar();
}

async function listenCar() {
  document.body.addEventListener('click', async (event) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('start-car')) {
      target.setAttribute(DISABLED, 'true');
      const parentEl: HTMLElement = target.closest('.car') as HTMLElement;
      const finishButton: HTMLElement = parentEl.querySelector('.finish-car') as HTMLElement;
      const carId: string = (parentEl?.id as string).slice(4);
      console.log(carId);

      const {velocity, distance} = await startCarsEngine(+carId);
      const idAnimation = animationCar(carId, distance, velocity);
      store.animation.push({
        id: carId,
        idAnimation: idAnimation.id,
        positionCar: idAnimation.positionCar,
      });
      finishButton.removeAttribute(DISABLED);

      finishButton.addEventListener('click', async () => {
        cancelAnimation(carId, idAnimation.id);
      })

      const { success } = await driveCarsEngine(+carId);
      if (!success) {
        cancelAnimationFrame(idAnimation.id);
      }
    }
  });
}

function animationCar(car: string, distance: number, timeAnimation: number): IFrameId {
  const startTime: number = new Date().getTime();
  const animFrameId: IFrameId = {id: 0, positionCar: 0};
  animFrameId.id = requestAnimationFrame(function animate() {
    const currTime: number = new Date().getTime();
    const timeMove: number = (distance / timeAnimation) / MILLISECONDS;
    const timeFraction: number = (currTime - startTime + ONE_SECONDS) / MILLISECONDS;
    const distanceDrove: number = (timeFraction / timeMove) * PERCENT_ALL;
    animFrameId.positionCar = distanceDrove;
    const carEl = document.getElementById(`car-${car}`) as HTMLElement;
    if (carEl) {
      (carEl.querySelector('.car-puth__car') as HTMLElement).style.marginLeft = `${distanceDrove}%`;
    }

    if (timeAnimation && distanceDrove < PERCENT_ALL) {
      animFrameId.id = requestAnimationFrame(animate);
    }
  });
return animFrameId;
}

async function cancelAnimation(carId: string, animatId: number) {
  cancelAnimationFrame(animatId);
  const carEl = (document.getElementById(`car-${carId}`) as HTMLElement);

  (carEl?.querySelector('.finish-car') as HTMLElement).setAttribute(DISABLED, 'true');

  const {velocity, distance} = await startCarsEngine(+carId, STOPPED);
  animationCar(carId, distance, velocity);
  store.animation.filter(item => item.id !== carId);
  (carEl?.querySelector('.start-car') as HTMLElement).removeAttribute(DISABLED);
}
