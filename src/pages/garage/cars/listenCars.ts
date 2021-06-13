import { deleteCar } from '../../../api/car/apiCar';
import { driveCarsEngine, startCarsEngine } from '../../../api/engine/apiEngine';
import store from '../../../store/store';
import { IAnimation } from '../../../store/store.module';
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
      const idCar: number = +(target.closest('.car')?.id.slice(4) as string);
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

      const {velocity, distance} = await startCarsEngine(+carId);
      const dataAnimation: IFrameId = await animationCar(carId, distance, velocity);
      finishButton.removeAttribute(DISABLED);

      store.animation.push({
        id: carId,
        dataAnimation: dataAnimation,
      });

      const { success } = await driveCarsEngine(+carId);
      if (!success) {
        cancelAnimationFrame(dataAnimation.id);
      }
      dataAnimation.start = true;
      dataAnimation.finish = true;
      target.removeAttribute(DISABLED);
    }
    if (target.classList.contains('finish-car')) {
      const parentEl: HTMLElement = target.closest('.car') as HTMLElement;
      const carId: string = (parentEl?.id as string).slice(4);
      const currentAnimat: IAnimation = store.animation.find(item => item.id === carId) as IAnimation;
      cancelAnimation(carId, currentAnimat?.dataAnimation.id);
    }
  });
}

export async function animationCar(car: string, distance: number, timeAnimation: number): Promise<IFrameId> {
  const startTime: number = new Date().getTime();
  const animFrameId: IFrameId = {id: 0, positionCar: 0, start: false, finish: true};
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

export async function cancelAnimation(carId: string, animatId: number): Promise<void> {
  cancelAnimationFrame(animatId);
  const carEl = (document.getElementById(`car-${carId}`) as HTMLElement);

  (carEl?.querySelector('.finish-car') as HTMLElement).setAttribute(DISABLED, 'true');

  const {velocity, distance} = await startCarsEngine(+carId, STOPPED);
  animationCar(carId, distance, velocity);
  store.animation = store.animation.filter(item => item.id !== carId);
}
