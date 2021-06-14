import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://api-book-recommender.herokuapp.com/api/`,
});

export default instance;
