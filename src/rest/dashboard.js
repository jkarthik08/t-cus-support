import axios from "axios";

export const getDashboardData = () => {
  return axios.get('getDashboardData')
    .then(response => response.data);
};
