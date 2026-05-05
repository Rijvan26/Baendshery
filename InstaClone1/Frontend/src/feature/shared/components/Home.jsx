import React from "react";
import { useNavigate } from "react-router-dom";
import "../home.scss"

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home__card">
        <h1 className="home__title">Welcome to RizzGram</h1>

        <p className="home__subtitle">
          Connect with people. Share your journey. Post your moments.
        </p>

        <div className="home__buttons">
          <button
            className="btn btn--login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="btn btn--register"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;