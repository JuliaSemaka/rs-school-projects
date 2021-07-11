import { ICards } from "../store/reducers/cardReducer.module";

export interface ICardProps {
  key: number;
  index: number;
  name: string;
}

export interface ICardChangeProps {
  name: string;
  changeCategory?(): void;
}

export interface IOneCardProps {
  key: string;
  item: ICards;
  listenAudio(audioSrc: string): void;
  finishGame(): void;
}

export interface IAdminWordPage {
  item: ICards;
}

export interface IAdminChangeWord {
  item?: ICards;
  setChangeWord(): void;
}
