const fetch = require('node-fetch');
const baseURL = 'http://localhost:' + '3001';

const data = require('./data');

const loadCustomerData = () => {
  return fetch(baseURL + '/customerInfo.json').then(r => r.json());
};

const loadAddons = () => {
  return fetch(baseURL + '/addonServices.json').then(r => r.json()).then(res => res.addonServicies);
};

const loadPackages = () => {
  return fetch(baseURL + '/packages.json').then(r => r.json()).then(res => res.package);
};

const searchCustomer = (search) => {
  let p = new Promise((resolve, reject) => {
    let filtered;
    if (search === '')
      filtered = data.getData().customers;
    else
      filtered = data.getData().customers.filter((cust) => (cust.tsn.includes(search) || cust.personalInfo.name.toLowerCase().includes(search.toLowerCase())));

    resolve(filtered);
  });

  return p;
};

const saveCustomer = (customerData) => {
  data.updateCustomer(customerData);
  return new Promise((resolve, reject) => {
    resolve(customerData);
  });
};

const addCustomer = (customerData) => {
  customerData.tsn = 'A' + (++data.tsn);
  data.addCustomer(customerData);
  return new Promise((resolve, reject) => {
    resolve(data.getData().customers);
  });
};

module.exports.searchCustomer = searchCustomer;
module.exports.loadCustomerData = loadCustomerData;
module.exports.loadAddons = loadAddons;
module.exports.loadPackages = loadPackages;
module.exports.saveCustomer = saveCustomer;
module.exports.addCustomer = addCustomer;
