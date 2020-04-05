import { all, fork } from "redux-saga/effects";

import cardsWatcher from "./cards/saga";

export default function* rootSaga() {
  // always run - first install & app
  console.warn("starting all common sagas");
  yield all([fork(cardsWatcher)]);
  console.warn("done starting all common sagas");
}
