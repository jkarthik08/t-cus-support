import React from 'react';
import { connect } from 'react-redux';
import ListItem from './list-item';

const Widget = ({ packages }) => {
  let addOnItems;
  if (packages) {
    addOnItems = packages.map((item) => {
      return <ListItem key={item.packageId} addOn={item} />
    });
  };
  return <div className='widget-container'>
    {addOnItems}
  </div>;
};

const mapStateToProps = (state) => {
  return {
    packages: state.dashboard.packages,
  };
};

export default connect(mapStateToProps, null)(Widget);
