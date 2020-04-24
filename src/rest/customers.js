import axios from "axios";

export const getCustomers = () => {
  return axios.get('customers')
    .then(response => response.data);
};

export const searchCustomers = (value) => {
  return axios.get(`customers/search?key=${value}`)
    .then(response => response.data);
};

export const saveCustomer = (value) => {
  return axios.put('customers', value)
    .then(response => response.data);
};

export const addCustomer = (value) => {
  return axios.post('customers', value)
    .then(response => response.data);
};

export const loadAddons = () => {
  return axios.get(`addons`)
    .then(response => response.data);
};

export const loadPackages = () => {
  return axios.get(`packages`)
    .then(response => response.data);
};
