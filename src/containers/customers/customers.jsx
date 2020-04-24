import React, { useEffect } from 'react';
import SearchCustomers from '../../components/customers/search-customers';
import { connect } from 'react-redux';
import { loadAddons, loadPackages } from '../../actions/customer-actions';

const Customers = ({ loadAddons, loadPackages }) => {
  useEffect(() => {
    loadAddons();
    loadPackages();
  }, [loadAddons, loadPackages]);

  return <div className='customers-content'>
    <SearchCustomers />
  </div>
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAddons: () => dispatch(loadAddons()),
    loadPackages: () => dispatch(loadPackages())
  };
};

export default connect(null, mapDispatchToProps)(Customers);
