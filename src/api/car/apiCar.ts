import { GARAGE } from '../api.config';
import { IGetCars, ICarsResponse, ICreateCarParams } from './apiCar.model';

export async function getCars(page: number, limit: number = 7): Promise<IGetCars> {
  const response: Response = await fetch(`${GARAGE}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count') as string,
  };
}

export async function getCar(id: number): Promise<ICarsResponse> {
  return (await fetch(`${GARAGE}/${id}`)).json();
}

export async function createCar(data: ICreateCarParams): Promise<ICarsResponse> {
  const response: Response = await fetch(GARAGE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function deleteCar(id: number): Promise<number> {
  const response: Response = await fetch(`${GARAGE}/${id}`, {
    method: 'DELETE',
  });

  return response.status;
}

export async function updateCar(id: number, data: ICreateCarParams): Promise<ICarsResponse> {
  const response: Response = await fetch(`${GARAGE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
