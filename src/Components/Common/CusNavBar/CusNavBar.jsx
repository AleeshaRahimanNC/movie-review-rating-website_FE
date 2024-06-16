import React, { useState } from "react";
import "./CusNavBar.css";
import ICON from "@assets/MysticMovies_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext/ThemeContext";

function CusNavBar({ onCategorySelect }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTheme, theme } = useTheme();

  // const handleCategoryClick = (category) => {
  //   if (onCategorySelect) {
  //     onCategorySelect(category);
  //   }
  // };

  const handleCategoryClick = (category) => {
    if (category === "All Movies") {
      navigate("/home");
      // If "All Movies" is clicked, pass null to indicate show all movies
      if (onCategorySelect) {
        onCategorySelect(null);
      }
    } else {
      // Otherwise, pass the selected category
      if (onCategorySelect) {
        onCategorySelect(category);
      }
    }
  };
  

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const handleUserHomeClick = () => {
    navigate("/home");
  };

  const handleAdminHomeClick = () => {
    navigate("/adminHome");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Redirect to login or home page
  };

  const isAdminPanelPage = location.pathname.startsWith("/adminHome");

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <>

      <nav className="navbar navbar-expand-lg shadow py-3 sticky-top">
      {/* <nav className=    {`navbar navbar-expand-lg shadow py-3 sticky-top ${theme === 'light' ? 'light-theme ' : 'navbar'}`}> */}
        <div className="container-fluid">
          <span className="navbar-brand">
            <img
              className="navbar-icon"
              src={ICON}
              alt=""
              style={{ marginRight: "3px" }}
            />
            Hi <span style={{ marginLeft: "5px" }}>{user.name}</span>!
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link" onClick={handleUserHomeClick}>
                  Home
                </span>
              </li>

              {user.role === "admin" && isAdminPanelPage && (
                <li className="nav-item">
                  <span className="nav-link" onClick={handleAdminHomeClick}>
                    Admin Home
                  </span>
                </li>
              )}

              {!isAdminPanelPage && (
                <li className="nav-item">
                  <span
                    className="nav-link"
                    onClick={() => handleCategoryClick("All Movies")}
                  >
                    All Movies
                  </span>
                </li>
              )}

              {!isAdminPanelPage && (
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="true"
                  >
                    Category
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <span
                        className="dropdown-item"
                        onClick={() => handleCategoryClick("Malayalam")}
                      >
                        Malayalam
                      </span>
                    </li>
                    <li>
                      <span
                        className="dropdown-item"
                        onClick={() => handleCategoryClick("Tamil")}
                      >
                        Tamil
                      </span>
                    </li>
                    <li>
                      <span
                        className="dropdown-item"
                        onClick={() => handleCategoryClick("Hindi")}
                      >
                        Hindi
                      </span>
                    </li>
                  </ul>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center ">
              {showSearchInput && (
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Search..."
                />
              )}
              <button
                className="btn btn-link text-decoration-none"
                onClick={toggleSearchInput}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ color: "#FF0000" }}
                  size="lg"
                />
              </button>

              <div className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle custom-dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                >
                  <FontAwesomeIcon
                    icon={faCog}
                    style={{ color: "#FF0000" }}
                    size="2x"
                  />
                </span>
                <ul
                  className="dropdown-menu dropdown-menu-end dropdown__style"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {/* <li>
                    <span className="dropdown-item">Light Mode</span>
                  </li>
                  <li>
                    <span className="dropdown-item">Dark Mode</span>
                  </li> */}
                  <li>
                    <span className="dropdown-item" onClick={handleToggleTheme}>
                      {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </span>
                  </li>
                  {user.role === "admin" && (
                    <li>
                      <span
                        className="dropdown-item"
                        onClick={handleAdminHomeClick}
                      >
                        Admin Panel
                      </span>
                    </li>
                  )}
                  <li>
                    <span className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default CusNavBar;
