import { combineReducers } from "redux";

import cardsReducer from "./cards/reducer";
export const rootReducer = combineReducers({
  cards: cardsReducer,
});

export default rootReducer;
