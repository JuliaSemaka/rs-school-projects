import { combineReducers } from "redux";
import { cardsReducer } from "./cardsReducer";
import { statisticsReducer } from "./statisticsReducer";

export const rootReducer = combineReducers({
  cards: cardsReducer,
  statistics: statisticsReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
