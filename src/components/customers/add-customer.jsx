import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { postCustomer } from '../../actions/customer-actions';
import { TextField } from '@material-ui/core';

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

const AddCustomer = ({ packages, addons, postCustomer, onCancel, showAlert }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const saveCustomer = () => {
    postCustomer({
      regionCode: '3',
      personalInfo: {
        name: name,
        email: email,
        img: 'https://webstockreview.net/images/smiley-face-clip-art-human-face-3.png'
      },
      package: selectedPackages.join(','),
      addOnService: selectedAddons.join(',')
    });
    onCancel();
    showAlert('Customer added successfully!');
  };

  return <div style={{ padding: '30px' }}>
    <h3>New Customer</h3>
    <div style={{ padding: '30px' }}>
      <div className='row form-field-cont'>
        <div className='col-sm-2 form-field'>Name: </div>
        <div className='col-sm-8'>
          <TextField placeholder='Enter name' onChange={handleNameChange} />
        </div>
      </div>
      <div className='row form-field-cont'>
        <div className='col-sm-2 form-field'>Email: </div>
        <div className='col-sm-8'>
          <TextField placeholder='Enter email' onChange={handleEmailChange} />
        </div>
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
          <Button variant="contained" onClick={onCancel} style={{ marginLeft: '15px' }}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  </div>;
};

const mapStateToProps = (state) => {
  return {
    packages: state.packages,
    addons: state.addons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postCustomer: (customer) => dispatch(postCustomer(customer))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
