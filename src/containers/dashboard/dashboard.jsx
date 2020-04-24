import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadDashboardData } from '../../actions/dashboard-actions';
import Widget from '../../components/common/widget';
import { default as AddonWidget } from '../../components/dashboard/addons/widget';
import { default as DashboardWidget } from '../../components/dashboard/regions/widget';
import { default as PackageWidget } from '../../components/dashboard/packages/widget';

const Dashboard = ({ loadDashboardData, dashboardData }) => {
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return <div className='dashboard-content'>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-4 col-xs-12'>
          <Widget title='Addons' render={() => <AddonWidget />} />
        </div>
        <div className='col-sm-4 col-xs-12'>
          <Widget title='Regions' render={() => <DashboardWidget />} />
        </div>
        <div className='col-sm-4 col-xs-12'>
          <Widget title='Packages' render={() => <PackageWidget />} />
        </div>
      </div>
    </div>
  </div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDashboardData: () => dispatch(loadDashboardData())
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);

