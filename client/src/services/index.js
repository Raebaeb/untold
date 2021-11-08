import axios from "axios";
import { defaultRoute, register, login, logout } from "./user"
import { getAllStories, getStory, createStory, editStory, deleteStory } from "./story"
import { getAllScenes, getScene, createScene, editScene, deleteScene } from './scene'
import { getAllCharacters, getCharacter, createCharacter, editCharacter, deleteCharacter } from './character'
import { getAllIdeas, getIdea, createIdea, editIdea, deleteIdea } from './idea'

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
  createScene,
  editScene,
  deleteScene,
  getAllCharacters,
  getCharacter,
  createCharacter,
  editCharacter,
  deleteCharacter,
  getAllIdeas,
  getIdea,
  createIdea,
  editIdea,
  deleteIdea,
}