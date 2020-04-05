import * as appActions from "../root-action";
import * as cardsActions from "./actions";
import { Card } from "./types";
import { takeLatest, put } from "redux-saga/effects";

/**
 * Load GET http request
 * @param {string} url
 * @return {string} response text
 */
function loadData(url: string): string | undefined {
  try {
    const request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);
    return request.responseText;
  } catch (e) {
    console.error("loadData() Error: ", e);
  }
  return undefined;
}

/**
 * Take the last call to appActions.start to launch the cards API,
 * and set the response in the reducer
 */
export default function* watcher() {
  yield takeLatest(appActions.start, function* () {
    const url = "http://localhost:3000/cards";
    const req = loadData(url);
    if (req) {
      const cards: Card[] = JSON.parse(req);
      yield put(cardsActions.start(cards));
    }
  });
}
