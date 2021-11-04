import axios from "axios";

const apiURL = process.env.NODE_ENV === "development"
  ? `http://localhost:8000/api`
  : "prodURL";

export const getAllScenes = async (storyid) => {
  try {
    const response = await axios.get(`${apiURL}/${storyid}/scenes/`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export const getScene = async (storyid, sceneid) => {
  try {
    const response = await axios.get(`${apiURL}/${storyid}/scenes/${sceneid}`);
    return response.data;
  } catch (e) {
    console.error(e.message)
  }
}