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

export const createScene = async (storyid, newStory) => {
  try {
    const response = await axios.post(`${apiURL}/${storyid}/scenes/new`, newStory);
    return response.data;
  } catch (e) {
    console.error(e.message)
  }
}

export const editScene = async (storyid, sceneid, storyInfo) => {
  try {
    const response = await axios.put(`${apiURL}/${storyid}/edit/${sceneid}`, storyInfo);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export const deleteScene = async (storyid, sceneid) => {
  try {
    await axios.delete(`${apiURL}/${storyid}/delete/${sceneid}`)
  } catch (e) {
    console.error(e.message);
  }
}