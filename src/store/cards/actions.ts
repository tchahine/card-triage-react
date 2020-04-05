import { createStandardAction } from "typesafe-actions";
import { Card } from "./types";

export const start = createStandardAction("CARDS.START")<Card[]>();
export const search = createStandardAction("CARDS.SEARCH")<string>();
export const changeStatus = createStandardAction("CARDS.CHANGESTATUS")<Card>();
