export interface ICarsResponse {
  name: string,
  color: string,
  id: number,
}

export interface IGetCars {
  items: ICarsResponse[],
  count: string,
}

export interface ICreateCarParams {
  name: string,
  color: string,
}
