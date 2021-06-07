import { engine } from "../api.config";
import { IStartResponse, IDriveResponse } from "./apiEngine.model";

export async function startCarsEngine(id: number): Promise<IStartResponse> {
  return (await fetch(`${engine}?id=${id}&status=started`)).json();
}

export async function stopCarsEngine(id: number): Promise<IStartResponse> {
  return (await fetch(`${engine}?id=${id}&status=stopped`)).json();
}

export async function driveCarsEngine(id: number): Promise<IDriveResponse> {
  const response: Response = await fetch(`${engine}?id=${id}&status=drive`).catch();
  if (response.status === 500) {
    return {success : false};
  } else {
    return await response.json();
  }
}
