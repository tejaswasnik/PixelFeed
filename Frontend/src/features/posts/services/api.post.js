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

export async function createPost(imageFile, caption) {
  try {
    const formData = new FormData();
    formData.append("imgURL", imageFile);
    formData.append("caption", caption);
    const response = await api.post("/", formData);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function likePost(postId) {
  try {
    const response = await api.post(`/like/${postId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function unLikePost(postId) {
  try {
    const response = await api.post(`/unlike/${postId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}
