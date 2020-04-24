import React, { useRef, useState } from 'react';
import { searchCustomers, selectCustomer } from '../../actions/dashboard-actions';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';



import CustomerDetails from './customer-details';
import AddCustomer from './add-customer';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SearchCustomers = ({ searchCustomers, customers, selectedCustomer, selectCustomer }) => {
  let ref = useRef();
  let [isNew, setIsNew] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSearchClick = () => {
    searchCustomers(ref.current.value);
  };

  const handleAddClick = () => {
    setIsNew(true);
  };

  const classes = useStyles();

  const handleListItemClick = (event, tsn) => {
    selectCustomer(tsn);
    setOpen(false);
  };

  let customersList = [];
  if (customers) {
    customersList = customers.map((item, index) => {
      return <React.Fragment key={item.tsn}>
        <ListItem
          button
          selected={selectedCustomer === item.tsn}
          onClick={(event) => handleListItemClick(event, item.tsn)}
        >
          <ListItemAvatar>
            <Avatar alt={item.personalInfo.name} src={item.personalInfo.img} />
          </ListItemAvatar>
          <ListItemText primary={item.personalInfo.name} />
        </ListItem>
        <Divider />
      </React.Fragment>;
    });
  }

  const onCancelCustomer = () => {
    setIsNew(false);
  };

  const showAlert = (message) => {
    setOpen(true);
    setAlertMessage(message);
  };

  const searchKeyPressed = (ev) => {
    if (ev.key === 'Enter') {
      handleSearchClick();
    }
  };

  return <>
    {isNew &&
      <div className='customers-new'>
        <AddCustomer onCancel={onCancelCustomer} showAlert={showAlert} />
      </div>}
    {!isNew && <>
      <div className='customers-search'>
        <TextField inputRef={ref} label="Search" placeholder='A898765430 or John' onKeyPress={searchKeyPressed} />
        <Button variant="contained" color="primary" onClick={handleSearchClick}>
          Search
        </Button>
        <Button variant="contained" color="secondary" onClick={handleAddClick}>
          New Customer
        </Button>
      </div>
      <div className='row' style={{ paddingTop: '10px', marginLeft: '40px' }}>
        <div className='col-sm-4'>
          <div className={classes.root} style={{ borderRight: '1px solid #ccc' }}>
            <List component="nav" aria-label="customers">
              {customersList}
            </List>
          </div>
        </div>
        <div className='col-sm-8' style={{ marginTop: '30px' }}>
          <Collapse in={open} style={{ marginBottom: '30px', width: '600px' }}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {alertMessage}
            </Alert>
          </Collapse>
          {selectedCustomer !== '' && <CustomerDetails showAlert={showAlert} />}
        </div>
      </div>
    </>}
  </>;
};

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
    selectedCustomer: state.selectedCustomer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchCustomers: (value) => dispatch(searchCustomers(value)),
    selectCustomer: (value) => dispatch(selectCustomer(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCustomers);
