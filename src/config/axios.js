import axios from "axios";

const clienteAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HEROKU,
});
export default clienteAxios;
