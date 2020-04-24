import React from 'react';

let LegendItem = ({ item, color }) => {
  return <div>
    <span className="dot" style={{ backgroundColor: color }}></span>
    <span className="font-weight-semi-bold">{item.region}</span>
  </div>;
};

export default LegendItem;
