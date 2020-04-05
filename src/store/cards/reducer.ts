import { Card, Status } from "./types";
import * as cardsActions from "./actions";
import { getType } from "typesafe-actions";
import { combineReducers } from "redux";

export type IReducers = Readonly<{
  patients: { [id: number]: Card };
  search: string | null;
}>;

export default combineReducers<IReducers>({
  patients: (state = {}, action) => {
    switch (action.type) {
      case getType(cardsActions.start):
        const patientsMap: { [id: number]: Card } = {};
        action.payload.forEach((card: Card) => {
          return (patientsMap[card.id] = card);
        });
        return patientsMap;
      case getType(cardsActions.changeStatus):
        const card: Card = action.payload;
        const newPatientsMap = { ...state };
        if (card.status === Status.DONE) {
          newPatientsMap[card.id].status = Status.COMPLETED;
        } else {
          newPatientsMap[card.id].status = Status.DONE;
        }
        return newPatientsMap;
      default:
        return state;
    }
  },
  search: (state = null, action) => {
    switch (action.type) {
      case getType(cardsActions.search):
        return action.payload;
      default:
        return state;
    }
  },
});
