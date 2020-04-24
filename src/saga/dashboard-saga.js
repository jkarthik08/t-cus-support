import * as api from '../rest/dashboard';
import {
  saveDashboardData
} from '../actions/dashboard-actions';
import {
  call,
  put
} from 'redux-saga/effects';

export function* loadDashboardData() {
  try {
    const data = yield call(api.getDashboardData);
    yield put(saveDashboardData(data));
  } catch (error) {

  }
}
