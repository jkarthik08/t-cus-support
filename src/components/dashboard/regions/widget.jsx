import React from 'react';

import { connect } from "react-redux";
import Chart from "react-google-charts";
import LegendItem from './legend-item';

const Widget = ({ dashboardData }) => {
  const { regions } = dashboardData;
  let chartData = [];
  let legendItems = [];

  const arrColors = [{ color: '#343deb' }, { color: '#346eeb' }, { color: '#3483eb' }, { color: '#349feb' }, { color: '#34a0eb' }, { color: '#34cbe5' }, { color: '#f1f1f1' }];
  if (regions) {
    chartData = regions.map((item) => {
      return [item.region, item.count];
    });
    chartData.unshift(['Region', 'Count']);

    legendItems = regions.map((item, index) => {
      return <LegendItem key={index} item={item} color={arrColors[index].color} />;
    });
  }

  return <div className='row'>
    <div className='col-sm-5' style={{ fontSize: '14px' }}>
      <div className='legend-cont'>{legendItems}</div>
    </div>
    <div className='col-sm-7'>
      <Chart
        width='100%'
        chartType="PieChart"
        data={chartData}
        options={{
          backgroundColor: '#ffffff',
          pieHole: 0.85,
          slices: arrColors,
          pieSliceText: 'none',
          legend: 'none',
          chartArea: {
            top: 10,
            left: 10,
            bottom: 10,
            right: 10
          }
        }}
      />
    </div>
  </div>;
};

const mapStateToProps = (state) => {
  return {
    dashboardData: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(Widget);
