import { winners } from "../api.config";
import { IGetWinners, IUpdateDataWinners, IWinnerResponse } from "./apiWinner.model";

export async function getWinners(page: number, limit: number = 10, sort: string = 'id', order: string = ''): Promise<IGetWinners> {
  const response: Response = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count') as string,
  }
}

export async function getWinner(id: number): Promise<IWinnerResponse> {
  return (await fetch(`${winners}?id=${id}`)).json();
}

export async function createWinner(data: IWinnerResponse): Promise<IWinnerResponse> {
  const response: Response = await fetch(winners, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

export async function deleteWinner(id: number): Promise<object> {
  const response: Response = await fetch(`${winners}?id=${id}`, {
    method: 'DELETE',
  });

  return await response.json() as object;
}

export async function updateCar(id: number, data: IUpdateDataWinners): Promise<IWinnerResponse> {
  const response: Response = await fetch(`${winners}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}
