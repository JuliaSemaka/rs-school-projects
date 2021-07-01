import { combineReducers } from "redux";
import { cardsReducer } from "./cardsReducer";

export const rootReducer = combineReducers({
  cards: cardsReducer
})

export type RootState = ReturnType<typeof rootReducer>;
