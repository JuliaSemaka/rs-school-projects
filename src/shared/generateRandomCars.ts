import { ICreateCarParams } from '../api/car/apiCar.model';

const models: string[] = ['Tesla', 'Mersedes', 'BMW', 'Toyota', 'Zhiguli', 'Moskvich', 'Mazda', 'Reno'];
const names: string[] = ['S', 'ML', '6', 'X5', '3', 'Y', '5', 'G'];
const colors: string[] = ['#FF1493', '#FF4500', '#FFFF00', '#008B8B', '#808000', '#00BFFF', '#EE82EE', '#DEB887'];

function getRandomCar(): ICreateCarParams {
  const model: string = models[Math.floor(Math.random() * models.length)];
  const name: string = names[Math.floor(Math.random() * names.length)];
  const color: string = colors[Math.floor(Math.random() * colors.length)];

  return {
    name: `${model} ${name}`,
    color,
  };
}

export function generateRandomCars(count: number = 100): ICreateCarParams[] {
  const generateArr: ICreateCarParams[] = new Array(count);
  return generateArr.fill({ name:'', color:'' }).map(() => {
    const { name, color }: ICreateCarParams = getRandomCar();
    return { name, color };
  });
}
