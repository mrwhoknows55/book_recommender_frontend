import axios from "axios";
require('dotenv').config();
const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.API_BASE_URL
});

export default instance;
