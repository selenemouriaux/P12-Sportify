import axios from "axios";

const axiosParams = { baseURL: "http://localhost:3000/user/" };

const axiosInstance = axios.create(axiosParams);

const API = axios => {
  return {
    get: (url, config = {}) => axios.get(url, config),
  };
};

export default API(axiosInstance);