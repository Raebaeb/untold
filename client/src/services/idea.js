import axios from "axios";

const apiURL = process.env.NODE_ENV === "development"
  ? "http://localhost:8000/"
  : process.env.API_URL;

export const getAllIdeas = (storyid) => {
  try {
    const response = await axios.get(`${apiURL}/api/${storyid}/ideas`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const getIdea = (storyid, ideaid) => {
  try {
    const response = await axios.get(`${apiURL}/api/${storyid}/ideas/${ideaid}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const createIdea = (storyid) => {
  try {
    const response = await axios.post(`${apiURL}/api/${storyid}/ideas/new`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const editIdea = (storyid, ideaid) => {
  try {
    const response = await axios.put(`${apiURL}/api/${storyid}/ideas/edit/${ideaid}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const deleteIdea = (storyid, ideaid) => {
  try {
    const response = await axios.delete(`${apiURL}/api/${storyid}/ideas/delete/${ideaid}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};