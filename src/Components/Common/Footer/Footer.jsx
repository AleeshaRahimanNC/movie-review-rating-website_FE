import React from "react";
import "./Footer.css";
import ICON1 from "@assets/MysticMovies_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <footer className="bg-cover">
        <div className="footer-top">
          <div className="container">
            <div className="row gy-5">
              <div className="col-lg-4">
                <div className=".logo__wrapper1">
                  <h2 className="logo1">
                    <em>
                      <img
                        className="mystic-icon1"
                        src={ICON1}
                        alt="MysticMovies Icon"
                      />
                      MysticMovies
                    </em>
                  </h2>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime provident tempore non quam sapiente.
                </p>
                <div className="social-links">
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

              <div className="col-lg-3 ms-auto">
                <h6 className="text-white mb-4">CONTACT</h6>
                <p className="mb-1">P:(03) 8647 3754</p>
                <p className="mb-1">E:enquiries@gmail.com</p>
                <p className="mb-0">
                  A: 14 Paramore Street Mornington Penisula Victoria 5442
                </p>
              </div>

              <div className="col-lg-3">
                <h6 className="text-white mb-4">HELP DESK</h6>
                <p className="mb-1">Monday-friday:08:00-22:00</p>
                <p>Saturday-Sunday:08:00-23:00</p>
              </div>
            </div>
          </div>
        </div>
        {/* footer bottom */}
        <div className="footer-bottom">
          <div className="container">
            {/* <div className="row gy-3 justify-content-between">
                    <div className="col-auto">
                        <p className="mb-0">Copyrights all rights reserved</p>
                    </div>

                    <div className="col-auto">
                        <p className="mb-0">Designed By <a className='footer-link'><em>Aleesha</em></a></p>
                    </div>
                </div> */}
            <div className="text-center text-lg-left footer-container">
              <div className="text-center footer-box  p-3">
                &copy; {new Date().getFullYear()} Copyright:{" "}
                <a className="footer-link">MysticMovies.com</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
