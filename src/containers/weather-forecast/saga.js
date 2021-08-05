import { WEATHER_APIS } from 'constant/apis';
import { call, put, takeLatest } from 'redux-saga/effects';
import { buildUrl } from 'utils/url';
import { callAPI } from 'utils/request';

import {
  // Locations
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailed,

  // Weather
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailed
} from './slice';

export function* fetchDataSaga(action) {
  try {
    const { payload } = action;    
    const result = yield call(() =>
      callAPI({
        url: WEATHER_APIS.LOCATION_SEARCH,
        method: 'get',
        params: payload
      })
    );

    yield put(fetchDataSuccess(result.data));
  } catch (e) {
    yield put(fetchDataFailed());
  }
}

export function* fetchWeatherSaga(action) {
  try {
    const { payload } = action;    
    const result = yield call(() =>
      callAPI({
        url: buildUrl(WEATHER_APIS.LOCATION, { woeid: payload }),
        method: 'get'
      })
    );

    yield put(fetchWeatherSuccess(result.data));
  } catch (e) {
    yield put(fetchWeatherFailed());
  }
}

export default function* weatherForeCastSaga() {
  yield takeLatest(fetchDataStart.toString(), fetchDataSaga);
  yield takeLatest(fetchWeatherStart.toString(), fetchWeatherSaga);
}
