import { ICreateCarParams } from '../api/car/apiCar.model';

const models = ['Tesla', 'Mersedes', 'BMW', 'Toyota', 'Zhiguli', 'Moskvich', 'Mazda', 'Reno'];
const names = ['S', 'ML', '6', 'X5', '3', 'Y', '5', 'G'];
const colors = ['#FF1493', '#FF4500', '#FFFF00', '#008B8B', '#808000', '#00BFFF', '#EE82EE', '#DEB887'];

function getRandomCars(): ICreateCarParams {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return {
    name: `${model} ${name}`,
    color,
  };
}

export function generateRandomCars(count = 100): ICreateCarParams[] {
  const generateArr = new Array(count);
  return generateArr.fill(1).map(() => {
    const { name, color }: ICreateCarParams = getRandomCars();
    return { name, color };
  });
}
