import { garage } from "../api.config"
import { IGetCars, ICarsResponse, ICreateCarParams } from "./apiCar.model"

export async function getCars(page: number, limit: number = 7): Promise<IGetCars> {
  const response: Response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json() as ICarsResponse,
    count: response.headers.get('X-Total-Count') as string,
  }
}

export async function getCar(id: number): Promise<ICarsResponse> {
  return (await fetch(`${garage}?id=${id}`)).json();
}

export async function createCar(data: ICreateCarParams): Promise<ICarsResponse> {
  const response: Response = await fetch(garage, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

export async function deleteCar(id: number): Promise<object> {
  const response: Response = await fetch(`${garage}?id=${id}`, {
    method: 'DELETE',
  });

  return await response.json() as object;
}

export async function updateCar(id: number, data: ICreateCarParams): Promise<ICarsResponse> {
  const response: Response = await fetch(`${garage}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}
