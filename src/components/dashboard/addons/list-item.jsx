import React from 'react';

const ListItem = ({ addOn }) => {
  return <div className='addon-item'>
    <img src={addOn.image} alt={addOn.name}></img>
    <label>{addOn.count} customers</label>
  </div>;
};

export default ListItem;
