import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://books-api.mrwhoknows.com/api/`,
});

export default instance;
