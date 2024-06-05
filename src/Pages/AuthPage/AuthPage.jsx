import React, { useState } from "react";
import "./AuthPage.css";
import ICON from "@assets/MysticMovies_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons"; // Import email and lock icons

function AuthPage() {
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  const handleRegisterClick = () => {
    setIsRegisterActive(true);
  };

  const handleLoginClick = () => {
    setIsRegisterActive(false);
  };

  return (
    <>
      <div className="background"> </div>

      <div className={`container ${isRegisterActive ? "active" : ""}`}>
        <div className="col-md-6 left-side d-flex justify-content-between flex-column">
          <h2 className="logo">
            <img className="mystic-icon" src={ICON} alt="" />
            MysticMovies
          </h2>

          <div className="text-content">
            <h2>
              Welcome!<span className="new-line">To Our New Website.</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vel
              sunt a nisi quia deleniti.
            </p>
          </div>

          <div className="social-icons">
            <a href="#" className="icon-link">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                style={{ color: "#ffffff" }}
              />
            </a>
            <a href="#" className="icon-link">
              <FontAwesomeIcon
                icon={faFacebookF}
                style={{ color: "#ffffff" }}
              />
            </a>
            <a href="#" className="icon-link">
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ color: "#ffffff" }}
              />
            </a>
            <a href="#" className="icon-link">
              <FontAwesomeIcon icon={faTwitter} style={{ color: "#ffffff" }} />
            </a>
          </div>
        </div>

        <div className="col-md-6 right-side">
        <div className={`form-box login ${isRegisterActive ? "active" : ""}`}>
            <form action="#">
              <h2>Login</h2>

              <div className="input-box">
                <span className="input-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input type="email" name="email" required />
                <label htmlFor="">Email</label>
              </div>

              <div className="input-box">
                <span className="input-icon">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input type="password" name="password" required />
                <label htmlFor="">Password</label>
              </div>

              <button type="submit" className="button">
                Login
              </button>

              <div className="login-register">
                <p>
                  New User...?
                  <i className="register-link" onClick={handleRegisterClick}>
                    Register Now
                  </i>
                </p>
              </div>
            </form>
          </div>

          <div className={`form-box register ${isRegisterActive ? "active" : ""}`}>
            <form action="#">

              <h2>Register</h2>

              <div className="input-box">
                <span className="input-icon">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input type="text" name="name" required />
                <label htmlFor="">Username</label>
              </div>

              <div className="input-box">
                <span className="input-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input type="email" name="email" required />
                <label htmlFor="">Email</label>
              </div>

              <div className="input-box">
                <span className="input-icon">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input type="password" name="password" required />
                <label htmlFor="">Password</label>
              </div>

              <div className="input-box">
                <span className="input-icon">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input type="password" name="confirmPassword" required />
                <label htmlFor="">Confirm Password</label>
              </div>

              <button type="submit" className="button" onClick={handleLoginClick}>
                Register
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
