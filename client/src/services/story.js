import axios from "axios";

const apiURL = process.env.NODE_ENV === "development"
  ? "http://localhost:8000/api/stories/"
  : "prodURL";

export const getAllStories = async () => {
  try {
    const response = await axios.get(apiURL)
    return response.data
  } catch (e) {
    console.error(e.message);
  }
}

export const getStory = async (storyid) => {
  const response = await axios.get(`${apiURL}/${storyid}`);
  return response.data;
}

export const createStory = async (newStory) => {
  try {
    const response = await axios.post(`${apiURL}/new`, newStory);
    return response.data;
  } catch (e) {
    console.error(e.message)
  }
}

export const editStory = async (storyid, storyInfo) => {
  try {
    const response = await axios.put(`${apiURL}/edit/${storyid}`, storyInfo);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
}

export const deleteStory = async (storyid) => {
  try {
    await axios.delete(`${apiURL}/delete/${storyid}`)
  } catch (e) {
    console.error(e.message);
  }
}