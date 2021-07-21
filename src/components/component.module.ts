import { ICards } from "../store/reducers/cardReducer.module";

export const ADMIN = 'admin';

export interface ICardProps {
  key: number;
  index: number;
  name: string;
}

export interface ICardChangeProps {
  name: string;
  changeCategory(): void;
  index?: number;
}

export interface IOneCardProps {
  key: string;
  item: ICards;
  listenAudio(audioSrc: string): void;
  finishGame(): void;
}

export interface IAdminWordPage {
  item: ICards;
  index: number;
}

export interface IAdminChangeWord {
  item?: ICards;
  index?: number;
  setChangeWord(): void;
}

export interface IInputValue {
  value: string,
  onChange(event: React.ChangeEvent<HTMLInputElement>): void,
}
