import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { putCustomer } from '../../actions/customer-actions';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles (name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const getPackage = (packages, id) => packages.find((item) => parseInt(id) === parseInt(item.packageId));

const getAddon = (addons, id) => addons.find((item) => parseInt(id) === parseInt(item.id));

const CustomerDetails = ({ customers, selectedCustomer, packages, addons, putCustomer, showAlert }) => {
  let customer = null;

  const classes = useStyles();
  const theme = useTheme();
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const [packagePrice, setPackagePrice] = useState(0);
  const [addonPrice, setAddonPrice] = useState(0);

  const updatePackagePrice = (_packages) => {
    if (_packages) {
      let price = _packages.reduce((acc, pack) => {
        let p = getPackage(packages, pack);
        return acc + parseInt(p.price);
      }, 0);
      setPackagePrice(price);
    }
  };

  const updateAddonPrice = (_addons) => {
    if (_addons) {
      let price = _addons.reduce((acc, ott) => {
        let p = getAddon(addons, ott);
        return acc + parseInt(p.price);
      }, 0);
      setAddonPrice(price);
    }
  };

  const handleChange = (event) => {
    setSelectedPackages(event.target.value);
    updatePackagePrice(event.target.value);
  };

  const handleOTTChange = (event) => {
    setSelectedAddons(event.target.value);
    updateAddonPrice(event.target.value);
  };

  if (selectedCustomer !== '') {
    customer = customers.find((item) => {
      return item.tsn === selectedCustomer;
    });
  }

  useEffect(() => {
    if (customer.package && customer.package !== '') {
      let price = customer.package.split(',').reduce((acc, pack) => {
        return acc + parseInt(getPackage(packages, pack).price);
      }, 0);
      setSelectedPackages(customer.package.split(','));
      setPackagePrice(price);
    }
    else {
      setSelectedPackages([]);
      setPackagePrice(0);
    }
  }, [selectedCustomer, customer, packages]);

  useEffect(() => {
    if (customer.addOnService && customer.addOnService !== '') {
      let price = customer.addOnService.split(',').reduce((acc, ott) => {
        return acc + parseInt(getAddon(addons, ott).price);
      }, 0);
      setSelectedAddons(customer.addOnService.split(','));
      setAddonPrice(price);
    }
    else {
      setSelectedAddons([]);
      setAddonPrice(0);
    }
  }, [selectedCustomer, customer, addons]);

  const saveCustomer = () => {
    let clone = JSON.parse(JSON.stringify(customer));
    clone.addOnService = selectedAddons.join(',');
    clone.package = selectedPackages.join(',');
    putCustomer(clone);
    showAlert('Customer saved successfully!');
  };

  return <div className='row'>
    <div className='col-sm-2'>
      <img src={customer?.personalInfo.img} alt='Profile' className='profile-img'></img>
    </div>
    <div className='col-sm-10'>
      <div className='row form-field-cont'>
        <div className='col-sm-2 form-field'>Name: </div>
        <div className='col-sm-8'>{customer?.personalInfo.name}</div>
      </div>
      <div className='row form-field-cont'>
        <div className='col-sm-2 form-field'>TSN: </div>
        <div className='col-sm-8'>{customer?.tsn}</div>
      </div>
      <div className='row form-field-cont'>
        <div className='col-sm-2 form-field'>Packages: </div>
        <div className='col-sm-8 form-field-right'>
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={selectedPackages}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => {
                    let packageName = getPackage(packages, value).name;
                    return (
                      <Chip key={value} label={packageName} className={classes.chip} color="primary" />
                    )
                  }
                  )}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {packages.map((item) => (
                <MenuItem key={item.packageId} value={item.packageId} style={getStyles(item.packageId, selectedPackages, theme)}>
                  {item.name} - ${item.price}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <span className="badge badge-dark">${packagePrice}</span>
        </div>
      </div>

      <div className='row form-field-cont'>
        <div className='col-sm-2 form-field'>Addons: </div>
        <div className='col-sm-8 form-field-right'>
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={selectedAddons}
              onChange={handleOTTChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => {
                    let packageName = getAddon(addons, value).name;
                    return (
                      <Chip key={value} label={packageName} className={classes.chip} color="primary" />
                    )
                  })}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {addons.map((item) => (
                <MenuItem key={item.id} value={item.id} style={getStyles(item.id, selectedAddons, theme)}>
                  {item.name} - ${item.price}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <span className="badge badge-dark">${addonPrice}</span>
        </div>
      </div>
      <div className='row form-field-cont'>
        <div className='col-sm-2 form-field'>Total Price: </div>
        <div className='col-sm-8 form-field-right'><span className="badge badge-dark">${packagePrice + addonPrice}</span></div>
      </div>
      <div className='row'>
        <div className='col-sm-2 form-field'></div>
        <div className='col-sm-8 form-field-right'>
          <Button variant="contained" color="primary" onClick={saveCustomer}>
            Save
          </Button>
        </div>
      </div>
    </div>
  </div>;
};

const mapStateToProps = (state) => {
  return {
    selectedCustomer: state.selectedCustomer,
    customers: state.customers,
    packages: state.packages,
    addons: state.addons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putCustomer: (customer) => dispatch(putCustomer(customer))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);
