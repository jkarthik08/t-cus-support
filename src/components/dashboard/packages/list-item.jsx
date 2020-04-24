import React from 'react';

const ListItem = ({ addOn }) => {
  return <div className='addon-item'>
    <label style={{ width: '125px' }}>{addOn.name}</label>
    <label>{addOn.count} customers</label>
  </div>;
};

export default ListItem;
