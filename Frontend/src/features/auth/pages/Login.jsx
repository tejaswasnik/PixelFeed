import React from "react";
import "../style/Login.scss";
import DitherBG from "../components/DitherBG";
import "../style/DitherBG.scss";

const Login = () => {
  return (
    <main className="login-page">
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
      <div className="box">
        <div className="left">
          <div className="form-container">
            <form>
              <h1>Login</h1>
              <div className="input-field">
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  id="email"
                  placeholder="eg. john@example.com"
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
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="right">
          <img
            src="https://plus.unsplash.com/premium_photo-1710695570399-7d6e3725ba23?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="portrait"
          />
        </div>
      </div>
    </main>
  );
};

export default Login;
