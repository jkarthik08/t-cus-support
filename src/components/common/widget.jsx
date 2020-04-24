import React from 'react';

const Widget = ({ render, title }) => {
  return <div className="card card-container" >
    <div className="card-header bg-light">
      {title}
    </div>
    <div className="card-body">
      {render()}
    </div>
  </div>;
};

export default Widget;
