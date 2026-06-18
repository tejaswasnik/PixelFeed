import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  withCredentials: true,
});

export async function register(
  name,
  username,
  email,
  password,
  gender,
  bio,
  profilePicture,
) {
  try {
    const response = await api.post("/register", {
      name,
      username,
      email,
      password,
      gender,
      bio,
      profilePicture,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function login(email, password) {
  try {
    const response = await api.post("/login", { email, password });

    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getMe() {
  try {
    const response = await api.get("/getMe");
    return response.data;
  } catch (err) {}
}
