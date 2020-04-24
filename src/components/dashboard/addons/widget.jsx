import React from 'react';
import { connect } from 'react-redux';
import ListItem from './list-item';

const Widget = ({ addons }) => {
  let addOnItems;
  if (addons) {
    addOnItems = addons.map((item) => {
      return <ListItem key={item.id} addOn={item} />
    });
  };
  return <div className='widget-container'>
    {addOnItems}
  </div>;
};

const mapStateToProps = (state) => {
  return {
    addons: state.dashboard.addon,
  };
};

export default connect(mapStateToProps, null)(Widget);
