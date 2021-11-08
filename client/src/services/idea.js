import axios from "axios";

const apiURL = process.env.NODE_ENV === "development"
  ? "http://localhost:8000"
  : process.env.REACT_APP_API_URL;

export const getAllIdeas = async (storyid) => {
  try {
    const response = await axios.get(`${apiURL}/api/${storyid}/ideas`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const getIdea = async (storyid, ideaid) => {
  try {
    const response = await axios.get(`${apiURL}/api/${storyid}/ideas/${ideaid}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const createIdea = async (storyid, newIdea) => {
  try {
    const response = await axios.post(`${apiURL}/api/${storyid}/ideas/new`, newIdea);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const editIdea = async (storyid, ideaid, ideaInfo) => {
  try {
    const response = await axios.put(`${apiURL}/api/${storyid}/ideas/edit/${ideaid}`, ideaInfo);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const deleteIdea = async (storyid, ideaid) => {
  try {
    const response = await axios.delete(`${apiURL}/api/${storyid}/ideas/delete/${ideaid}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};