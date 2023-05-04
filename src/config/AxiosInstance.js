import axios from "axios";

const axiosinstance = axios.create({
  baseURL: "http://192.168.10.9:38080/v3/api-docs",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosinstance;
