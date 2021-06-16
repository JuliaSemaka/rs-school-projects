import { WINNER } from '../api.config';
import { IGetWinners, IUpdateDataWinners, IWinnerResponse } from './apiWinner.model';

export async function getWinners(page: number, sort = 'id', order = 'ASC', limit = 10): Promise<IGetWinners> {
  const response: Response = await fetch(`${WINNER}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count') as string,
  };
}

export async function getWinner(id: number): Promise<IWinnerResponse> {
  return (await fetch(`${WINNER}/${id}`)).json();
}

export async function createWinner(data: IWinnerResponse): Promise<IWinnerResponse> {
  const response: Response = await fetch(`${WINNER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function deleteWinner(id: number): Promise<number> {
  const response: Response = await fetch(`${WINNER}/${id}`, {
    method: 'DELETE',
  });

  return response.status;
}

export async function updateWinner(id: number, data: IUpdateDataWinners): Promise<IWinnerResponse> {
  const response: Response = await fetch(`${WINNER}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
