import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import rootSaga from "./root-saga";
import { compose } from "redux";

export { rootReducer };

export const composeEnhancers =
  (process.env.REACT_APP_DEVMODE === "on" && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware({
  onError(error, errorInfo) {
    try {
      console.error("saga crash!", JSON.stringify(error, null, 2), errorInfo.sagaStack);
    } catch (e) {
      console.error("saga crash! couldn't stringify error", e, errorInfo.sagaStack);
    }
  },
});

// configure middlewares
const middlewares = [
  sagaMiddleware, // for dispatching sagas
];

// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
export const store = createStore(rootReducer, initialState, enhancer);
persistStore(store);

sagaMiddleware.run(rootSaga as any);

(window as any).store = store;

export default store;
