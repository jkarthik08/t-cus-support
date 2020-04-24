const INITIAL_STATE = {
  dashboard: {},
  searchString: '',
  customers: [],
  addons: [],
  packages: [],
  selectedCustomer: ''
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'DASHBOARD_DATA_LOADED':
      return {
        ...state, dashboard: action.payload
      };
    case 'SEARCH_CUSTOMERS_LOADED':
      return {
        ...state, customers: action.payload,
          selectedCustomer: (action.payload && action.payload.length > 0) ? action.payload[0].tsn : ''
      };
    case 'ADDONS_LOADED':
      return {
        ...state, addons: action.payload
      };
    case 'PACKAGES_LOADED':
      return {
        ...state, packages: action.payload
      };
    case 'SELECT_CUSTOMER':
      return {
        ...state, selectedCustomer: action.payload
      };
    case 'UPDATE_CUSTOMER':
      let updatedCustomers = state.customers.map((item) => {
        if (item.tsn === action.payload.tsn) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state, customers: updatedCustomers
      };
    default:
      return state;
  }
};

export default rootReducer;
