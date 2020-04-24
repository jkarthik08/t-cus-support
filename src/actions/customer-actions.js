export const loadCustomers = () => {
  return {
    type: 'LOAD_CUSTOMERS'
  };
};

export const saveCustomers = (customers) => {
  return {
    type: "CUSTOMERS_LOADED",
    payload: customers
  };
};

export const putCustomer = (customer) => {
  return {
    type: "SAVE_CUSTOMER",
    payload: customer
  };
};

export const postCustomer = (customer) => {
  return {
    type: "ADD_CUSTOMER",
    payload: customer
  };
};

export const selectCustomer = (customer) => {
  return {
    type: "SELECT_CUSTOMER",
    payload: customer
  };
};

export const updateCustomer = (customer) => {
  return {
    type: "UPDATE_CUSTOMER",
    payload: customer
  };
};

export const loadAddress = (id) => {
  return {
    type: "LOAD_ADDRESS",
    payload: id
  };
};

export const saveSearchCustomers = (customers) => {
  return {
    type: "SEARCH_CUSTOMERS_LOADED",
    payload: customers
  };
};

export const saveAddons = (addons) => {
  return {
    type: "ADDONS_LOADED",
    payload: addons
  };
};

export const savePackages = (addons) => {
  return {
    type: "PACKAGES_LOADED",
    payload: addons
  };
};

export const loadAddons = () => {
  return {
    type: 'LOAD_ADDONS'
  };
};

export const loadPackages = () => {
  return {
    type: 'LOAD_PACKAGES'
  };
};
