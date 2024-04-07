import axios from 'axios'
import { useUserStore } from '@/stores/UserStore.js'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/App.vue'
const pinia = createPinia()
pinia.use(piniaPluginPersistedState);
const app = createApp(App)
app.use(pinia)

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/quizzes',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const config = {
  headers: {
    'Authorization' : 'Bearer ' + useUserStore().getToken
  }
}

export async function getQuizesByUser() {
  try {
    return await apiClient.get("/user/" + useUserStore().getUsername, config)
  } catch (error) {
    throw new Error('An error occurred while fetching quiz\'s by a user : ' + error.response.statusText);
  }
}

export async function getPublicQuizzes() {
  try {
    return await apiClient.get("/public", config)
  } catch (error) {
    throw new Error('An error occurred while fetching public quiz\'s : ' + error.response.statusText);
  }
}

export async function getQuizById(id) {
  try {
    return await apiClient.get("/" + id, config)
  } catch (error) {
    throw new Error('An error occurred while fetching public quiz\'s : ' + error.response.statusText);
  }
}

const categoryImageMapper = {
  1: "src/assets/img/categories/science.png",
  2: "src/assets/img/categories/math.png",
  3: "src/assets/img/categories/history.png",
  4: "src/assets/img/categories/sport.png",
  5: "src/assets/img/categories/film.png",
  6: "src/assets/img/categories/food.png"
}

export const categoryMapper = {
  1: "Science",
  2: "Math",
  3: "History",
  4: "Sport",
  5: "Film",
  6: "Food"
}

export const reversedCategoryMapper = {
  "Science": 1,
  "Math": 2,
  "History": 3,
  "Sport": 4,
  "Film": 5,
  "Food": 6
};

export function getCategoryImage(categoryId) {
  return categoryImageMapper[categoryId]
}

export function checkBadUserClearance() {
  return (useUserStore().getToken == null || useUserStore().getUsername == null)
}