import * as cardsActions from "./cards/actions";
import { createStandardAction } from "typesafe-actions";

export const start = createStandardAction("APP.START")();
export const unmount = createStandardAction("APP.FINISH")();

export default {
  cards: cardsActions,
};
