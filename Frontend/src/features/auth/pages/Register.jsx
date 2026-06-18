import React, { useState } from "react";
import "../style/Register.scss";
import DitherBG from "../components/DitherBG";
import "../style/DitherBG.scss";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
const Register = () => {
  const { handleRegister, loading } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    console.log({
      name,
      username,
      email,
      gender,
      bio,
      profilePicture,
      password,
    });
    await handleRegister(
      name,
      username,
      email,
      password,
      gender,
      bio,
      profilePicture,
    );
    console.log("user Registered.");
    navigate("/");
  }
  return (
    <main className="register-page">
      <div className="dither-bg-wrapper">
        <DitherBG
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>
      <div className="register-box">
        <div className="register-left">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h1>Create Account</h1>

              <div className="form-row">
                <div className="input-field">
                  <label htmlFor="name">Name :</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="eg. John Doe"
                    onInput={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="username">Username :</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="eg. johndoe123"
                    onInput={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-field">
                  <label htmlFor="email">Email :</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="eg. john@example.com"
                    onInput={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="gender">Gender :</label>
                  <select
                    id="gender"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              <div className="input-field">
                <label htmlFor="bio">Bio :</label>
                <textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  rows="3"
                  onInput={(e) => {
                    setBio(e.target.value);
                  }}
                />
              </div>

              <div className="input-field">
                <label htmlFor="profilePicture">Profile Picture :</label>
                <input
                  type="text"
                  id="profilePicture"
                  placeholder="URL to your profile picture"
                  onInput={(e) => {
                    setProfilePicture(e.target.value);
                  }}
                />
              </div>

              <div className="input-field">
                <label htmlFor="password">Password :</label>
                <input
                  type="password"
                  id="password"
                  placeholder="eg. ••••••••"
                  onInput={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <button type="submit" className="auth-btn">
                Register
              </button>
            </form>
          </div>
        </div>
        <div className="register-right">
          <img
            src="https://images.unsplash.com/photo-1634127017864-a2f2d934ab72?q=80&w=747&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="portrait"
          />
        </div>
      </div>
    </main>
  );
};

export default Register;
