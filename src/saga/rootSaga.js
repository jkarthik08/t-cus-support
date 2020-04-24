import {
  all,
  takeLatest
} from 'redux-saga/effects';
import {
  loadDashboardData
} from './dashboard-saga';
import {
  searchCustomers,
  loadAddons,
  loadPackages,
  saveCustomer,
  addCustomer
} from './customers-saga';

export default function* rootSaga() {
  yield all([
    takeLatest('LOAD_DASHBOARD_DATA', loadDashboardData),
    takeLatest('SEARCH_CUSTOMERS', searchCustomers),
    takeLatest('LOAD_ADDONS', loadAddons),
    takeLatest('LOAD_PACKAGES', loadPackages),
    takeLatest('SAVE_CUSTOMER', saveCustomer),
    takeLatest('ADD_CUSTOMER', addCustomer)
  ]);
}
