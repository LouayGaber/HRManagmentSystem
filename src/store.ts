import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import { all } from "redux-saga/effects";
import userSaga from "./sagas/userSaga";

import userReducer, {
  initialState as userInitialState,
} from "./reducers/userReducer";
const rootReducer = combineReducers({
  user: userReducer,
});
export type rootState = ReturnType<typeof rootReducer>;
const initialStateObj: any = {
  user: userInitialState,
};

function* rootSaga() {
  yield all([...userSaga]);
}

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  let store;

  store = createStore(
    rootReducer,
    initialStateObj,
    bindMiddleware([sagaMiddleware])
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
