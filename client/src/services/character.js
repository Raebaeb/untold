import axios from "axios";

const apiURL = process.env.NODE_ENV === "development"
  ? `http://localhost:8000`
  : process.env.REACT_APP_API_URL;

export const getAllCharacters = async (storyid) => {
  try {
    const response = await axios.get(`${apiURL}/api/${storyid}/characters`);
    console.log('ALL CHAR QUER',response)
    return response.data;
  } catch (e) {
    console.error('ALL CHAR QYER', e);
  }
};

export const getCharacter = async (storyid, charid) => {
  try {
    const response = await axios.get(`${apiURL}/api/${storyid}/characters/${charid}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const createCharacter = async (storyid, newChar) => {
  try {
    const response = await axios.post(`${apiURL}/api/${storyid}/characters/new`, newChar);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const editCharacter = async (storyid, charid, charInfo) => {
  try {
    const response = await axios.put(`${apiURL}/api/${storyid}/characters/edit/${charid}`, charInfo);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const deleteCharacter = async (storyid, charid) => {
  try {
    const response = await axios.delete(`${apiURL}/api/${storyid}/characters/delete/${charid}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};