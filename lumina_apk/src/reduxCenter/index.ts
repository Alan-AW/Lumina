import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
