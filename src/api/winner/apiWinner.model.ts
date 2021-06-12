export interface IWinnerResponse {
  id: number,
  wins: number,
  time: number,
}

export interface IGetWinners {
  items: IWinnerResponse[],
  count: string,
}

export interface IUpdateDataWinners {
  wins: number,
  time: number,
}
