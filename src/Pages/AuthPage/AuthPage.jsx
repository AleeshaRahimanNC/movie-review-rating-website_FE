import React, { useState } from "react";
import "./AuthPage.css";
import authImage from "@assets/background_img.jpeg";
import ICON from "@assets/MysticMovies_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import LoginBox from "../../Components/AuthBox/LoginBox";
import RegisterBox from "../../Components/AuthBox/RegisterBox";

function AuthPage() {
  const [boxType, setBoxType] = useState("login");
  return (
    <div className="background">
      <div
        className="container-fluid d-flex justify-content-center  align-items-center  vh-100 vw-100 authpage"
        style={{ position: "relative", zIndex: "2" }}
      >
        <div className="row">
          <div
            className={`col-md-6  ${
              boxType === "login" ? "left-image__login" : "left-image__register"
            }`}
            style={{
              backgroundImage: `url(${authImage})`,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          >
            <div className="logo__wrapper">
              <h2 className="logo">
                <em>
                  <img
                    className="mystic-icon"
                    src={ICON}
                    alt="MysticMovies Icon"
                  />
                  MysticMovies
                </em>
              </h2>
            </div>

            {/* <p>
               <h2>Welcome!</h2>
               <span className="new-line">To Our New Website,MysticMovies.</span></p> */}
            <div className="text-content">
              <h2>
                Welcome!<span className="new-line">To Our New Website.</span>
              </h2>
              <h6>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                vel sunt a nisi quia deleniti.
              </h6>

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
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ color: "#ffffff" }}
                />
              </a>
            </div>
            </div>
            {/* icon */}
            
          </div>

          <div className="col-md-6 right-side ">
            <h3 className="text-center mt-4 mb-4">
              {boxType === "login" ? "Login" : "Register"}
            </h3>
            {boxType === "login" ? (
              <LoginBox toggleBox={setBoxType} />
            ) : (
              <RegisterBox toggleBox={setBoxType} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
