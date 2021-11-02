import axios from 'axios';

const apiURL = process.env.NODE_ENV === "development"
  ? "devURL"
  : "prodURL";

  export const defaultRoute = async () => {
    try {
      const response = await axios.get(apiURL);
      return response.data;
    } catch (e) {
      console.error(e.message)
    }
  }