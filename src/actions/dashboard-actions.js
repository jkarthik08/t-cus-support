export const loadDashboardData = () => {
  return {
    type: 'LOAD_DASHBOARD_DATA'
  };
};

export const saveDashboardData = (data) => {
  return {
    type: "DASHBOARD_DATA_LOADED",
    payload: data
  };
};

export const searchCustomers = (value) => {
  return {
    type: 'SEARCH_CUSTOMERS',
    payload: value
  };
};

export const selectCustomer = (value) => {
  return {
    type: 'SELECT_CUSTOMER',
    payload: value
  };
};
