import { WEATHER_APIS } from 'constant/apis';
import { call, put, takeLatest } from 'redux-saga/effects';

import { callAPI } from '../../utils/request';
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailed
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

export default function* weatherForeCastSaga() {
  yield takeLatest(fetchDataStart.toString(), fetchDataSaga);
}
