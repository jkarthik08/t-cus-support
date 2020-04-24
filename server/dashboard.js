const data = require('./data');

const getRegionDetails = (regions, id) => {
  return regions.find((item) => item.regionCode === id);
};

const getAddonDetails = (addonServices, id) => {
  return addonServices.find((item) => item.id.toString() === id.toString());
};

const getPackageDetails = (packages, id) => {
  return packages.find((item) => item.packageId.toString() === id.toString());
};

// function to consolidate the data for dashboard
const getDashboardData = () => {
  const {
    customers,
    regions,
    addonServices,
    packages
  } = data.getData();

  let objRegions = {};
  let objAddonServices = {};
  let objPackages = {};

  customers.forEach((item) => {
    if (objRegions[item.regionCode]) {
      objRegions[item.regionCode].count++;
    } else {
      objRegions[item.regionCode] = {
        ...getRegionDetails(regions, item.regionCode),
        count: 1
      };
    }

    if (item.addOnService && item.addOnService !== '') {
      let custAddon = item.addOnService.split(',');
      custAddon.forEach((addon) => {
        if (objAddonServices[addon]) {
          objAddonServices[addon].count++;
        } else {
          objAddonServices[addon] = {
            ...getAddonDetails(addonServices, addon),
            count: 1
          };
        }
      });
    }

    if (item.package && item.package !== '') {
      let custPackage = item.package.split(',');
      custPackage.forEach((pack) => {
        if (objPackages[pack]) {
          objPackages[pack].count++;
        } else {
          objPackages[pack] = {
            ...getPackageDetails(packages, pack),
            count: 1
          };
        }
      });
    }
  });
  return {
    regions: Object.values(objRegions),
    addon: Object.values(objAddonServices),
    packages: Object.values(objPackages)
  };
};

module.exports.getDashboardData = getDashboardData;
