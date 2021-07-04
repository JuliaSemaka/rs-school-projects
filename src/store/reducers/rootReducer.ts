import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { cardsReducer } from "./cardsReducer";
import { statisticsReducer } from "./statisticsReducer";

export const rootReducer = combineReducers({
  cards: cardsReducer,
  statistics: statisticsReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
