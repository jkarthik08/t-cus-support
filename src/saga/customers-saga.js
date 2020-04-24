import * as api from '../rest/customers';
import {
  saveCustomers,
  saveSearchCustomers,
  saveAddons,
  savePackages,
  updateCustomer
} from '../actions/customer-actions';
import {
  call,
  put
} from 'redux-saga/effects';

export function* loadCustomers() {
  try {
    const customers = yield call(api.getCustomers);
    yield put(saveCustomers(customers));
  } catch (error) {
    //action to show error
  }
}

export function* searchCustomers(action) {
  try {
    const customers = yield call(api.searchCustomers, action.payload);
    yield put(saveSearchCustomers(customers));
  } catch (error) {
    //action to show error
  }
}

export function* saveCustomer(action) {
  try {
    const customer = yield call(api.saveCustomer, action.payload);
    yield put(updateCustomer(customer));
  } catch (error) {
    //action to show error
  }
}

export function* addCustomer(action) {
  try {
    const customers = yield call(api.addCustomer, action.payload);
    yield put(saveSearchCustomers(customers));
  } catch (error) {
    //action to show error
  }
}

export function* loadAddons() {
  try {
    const addons = yield call(api.loadAddons);
    yield put(saveAddons(addons));
  } catch (error) {
    //action to show error
  }
}

export function* loadPackages() {
  try {
    const packages = yield call(api.loadPackages);
    yield put(savePackages(packages));
  } catch (error) {
    //action to show error
  }
}
