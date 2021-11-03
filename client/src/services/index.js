import axios from "axios";
import { defaultRoute, register, login, logout } from "./user"

axios.defaults.withCredentials = true;

export {
  defaultRoute,
  register,
  login,
  logout
}