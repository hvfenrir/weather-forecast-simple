import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import saga from './rootSaga';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();
const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({ thunk: false }),
  sagaMiddleware
];

const store = configureStore({
  reducer: rootReducer(),
  middleware
});

sagaMiddleware.run(saga);

export default store;