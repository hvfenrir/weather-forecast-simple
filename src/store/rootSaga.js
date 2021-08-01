import { all } from 'redux-saga/effects';
import weatherForeCastSaga from 'containers/weather-forecast/saga';

export default function* rootSaga() {
  yield all([weatherForeCastSaga()]);
}
