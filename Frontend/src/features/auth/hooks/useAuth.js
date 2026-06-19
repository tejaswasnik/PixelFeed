import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe } from "../services/api.auth";
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  async function handleLogin(username, password) {
    setLoading(true);
    try {
      const response = await login(username, password);
      setUser(response.user);
      return response;
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(
    name,
    username,
    email,
    password,
    gender,
    bio,
    profilePicture,
  ) {
    setLoading(true);
    try {
      const response = await register(
        name,
        username,
        email,
        password,
        gender,
        bio,
        profilePicture,
      );
      setUser(response.user);
      return response;
    } finally {
      setLoading(false);
    }
  }

  return { user, setUser, loading, handleLogin, handleRegister, getMe };
}
