import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_USER_BASE_URL,
  withCredentials: true,
});

export async function getUserProfile(username) {
  try {
    const response = await api.get(`/profile/${username}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function followUser(username) {
  try {
    const response = await api.post(`/follow/${username}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function unfollowUser(username) {
  try {
    const response = await api.post(`/unfollow/${username}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}
