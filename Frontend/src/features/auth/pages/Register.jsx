import React from "react";
import "../style/Register.scss";
import DitherBG from "../components/DitherBG";
import "../style/DitherBG.scss";

const Register = () => {
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
            <form>
              <h1>Create Account</h1>

              <div className="form-row">
                <div className="input-field">
                  <label htmlFor="name">Name :</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="eg. John Doe"
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="username">Username :</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="eg. johndoe123"
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
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="gender">Gender :</label>
                  <select id="gender">
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
                />
              </div>

              <div className="input-field">
                <label htmlFor="profilePicture">Profile Picture :</label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                />
              </div>

              <div className="input-field">
                <label htmlFor="password">Password :</label>
                <input
                  type="password"
                  id="password"
                  placeholder="eg. ••••••••"
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
            src="https://plus.unsplash.com/premium_photo-1710695570399-7d6e3725ba23?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="portrait"
          />
        </div>
      </div>
    </main>
  );
};

export default Register;
