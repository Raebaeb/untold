import axios from "axios";
import { defaultRoute, register, login, logout } from "./user"
import { getAllStories, getStory, createStory, editStory, deleteStory } from "./story"
import { getAllScenes, getScene } from './scene'

axios.defaults.withCredentials = true;

export {
  defaultRoute,
  register,
  login,
  logout,
  getAllStories,
  getStory,
  createStory,
  editStory,
  deleteStory,
  getAllScenes,
  getScene,
}