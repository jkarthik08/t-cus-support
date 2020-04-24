const fetch = require('node-fetch');
const baseURL = 'http://localhost:' + '3001';

let data = {};

let tsn = 898765439;

const loadPromises = () => {
  const arrP = [fetch(baseURL + '/customerInfo.json').then(r => r.json()),
    fetch(baseURL + '/region.json').then(r => r.json()),
    fetch(baseURL + '/addonServices.json').then(r => r.json()),
    fetch(baseURL + '/packages.json').then(r => r.json())
  ];
  return Promise.all(arrP);
};

const loadData = () => {
  loadPromises().then(([customers, regions, addonServices, packages]) => {
    data = {
      customers: customers.customerInfo,
      regions: regions.region,
      addonServices: addonServices.addonServicies,
      packages: packages.package
    }
    // console.log(data);
  });
};

const getData = () => {
  return data;
};

const addCustomer = (customerData) => {
  data.customers.push(customerData);
};

const updateCustomer = (customerData) => {
  for (var i = 0; i < data.customers.length; i++) {
    var cust = data.customers[i];
    if (cust.tsn === customerData.tsn) {
      data.customers[i] = customerData;
      break;
    }
  }
};

module.exports.tsn = tsn;
module.exports.getData = getData;
module.exports.loadData = loadData;
module.exports.updateCustomer = updateCustomer;
module.exports.addCustomer = addCustomer;
