import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_POST_BASE_URL,
  withCredentials: true,
});

export async function getFeed() {
  try {
    const response = await api.get("/feed");
    return response.data;
  } catch (err) {
    throw err;
  }
}