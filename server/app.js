const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
const dashboard = require('./dashboard');
const customers = require('./customers');

const app = express();
const port = 3001;
app.use(cors());
app.use(express.static('data'));
app.use(bodyParser.json());

app.get('/getDashboardData', (req, res) => {
  res.send(dashboard.getDashboardData());
});

app.get('/customers', (req, res) => {
  customers.loadCustomerData().then((result) => {
    res.send(result);
  });
});

app.put('/customers', (req, res) => {
  customers.saveCustomer(req.body).then((result) => {
    res.send(result);
  });
});

app.post('/customers', (req, res) => {
  customers.addCustomer(req.body).then((result) => {
    res.send(result);
  });
});

app.get('/customers/search', (req, res) => {
  const query = (req.query.key) ? req.query.key : '';
  customers.searchCustomer(query).then((result) => {
    res.send(result);
  });
});

app.get('/addons', (req, res) => {
  customers.loadAddons().then((result) => {
    res.send(result);
  });
});

app.get('/packages', (req, res) => {
  customers.loadPackages().then((result) => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`T Customer support listening on port ${port}!`);

  // load data and store in the memory to avoid loading all the time
  data.loadData();
});
