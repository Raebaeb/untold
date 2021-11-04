import axios from "axios";

const apiURL = process.env.NODE_ENV === "development"
  ? "http://localhost:8000/"
  : process.env.API_URL;

export const defaultRoute = async () => {
    try {
      const response = await axios.get(apiURL);
      return response.data;
    } catch (e) {
      console.error(e.message)
    }
  }

export const register = async (newUser) => {
  try {
    const response = await axios.post(`${apiURL}/auth/user/register`, newUser);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export const login = async (userInfo) => {
  try {
    const response = await axios.post(`${apiURL}/auth/user/login`, userInfo);
    return response.data;
  } catch (e) {
    console.error(e.message)
  }
}

export const logout = async () => {
  try {
    await axios.get(`${apiURL}/auth/user/logout`);
  } catch (e) {
    console.error(e.message);
  }
}
