import axios from "axios";

const apiURL = process.env.NODE_ENV === "development"
  ? `http://localhost:8000`
  : process.env.API_URL;

export const getAllScenes = async (storyid) => {
  try {
    const response = await axios.get(`${apiURL}/api/${storyid}/scenes/`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export const getScene = async (storyid, sceneid) => {
  try {
    const response = await axios.get(`${apiURL}/api/${storyid}/scenes/${sceneid}`);
    return response.data;
  } catch (e) {
    console.error(e.message)
  }
}

export const createScene = async (storyid, newScene) => {
  try {
    const response = await axios.post(`${apiURL}/api/${storyid}/scenes/new`, newScene);
    return response.data;
  } catch (e) {
    console.error(e.message)
  }
}

export const editScene = async (storyid, sceneid, sceneInfo) => {
  try {
    const response = await axios.put(`${apiURL}/api/${storyid}/scenes/edit/${sceneid}`, sceneInfo);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export const deleteScene = async (storyid, sceneid) => {
  try {
    await axios.delete(`${apiURL}/api/${storyid}/scenes/delete/${sceneid}`)
  } catch (e) {
    console.error(e.message);
  }
}