import { ENGINE } from '../api.config';
import { IStartResponse, IDriveResponse } from './apiEngine.model';

export async function startCarsEngine(id: number, status = 'started'): Promise<IStartResponse> {
  return (await fetch(`${ENGINE}?id=${id}&status=${status}`)).json();
}

export async function driveCarsEngine(id: number): Promise<IDriveResponse> {
  const response: Response = await fetch(`${ENGINE}?id=${id}&status=drive`).catch();
  if (response.status === 500) {
    return { success: false };
  }
  return response.json();
}
