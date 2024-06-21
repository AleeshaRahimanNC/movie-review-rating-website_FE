import React, { useState } from "react";
import "./CusNavBar.css";
import ICON from "@assets/MysticMovies_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext/ThemeContext";
import { ErrorToast } from "../../../Plugins/Toast/Toast";

function CusNavBar({ onCategorySelect, movies = [] }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (movies && movies.length > 0) {
        const movie = movies.find((m) => m.title.toLowerCase() === searchQuery.toLowerCase());
        if (movie) {
          navigate(`/home/movieDetails/${movie._id}`);
        } else {
          ErrorToast("No result found");
        }
      } else {
        ErrorToast("No movies available to search");
      }
    }
  };

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg shadow py-3 sticky-top"> */}
      <nav
        className={`navbar navbar-expand-lg shadow py-3 sticky-top ${theme}-theme`}
      >
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
                    // className="dropdown-menu"
                    className={`dropdown-menu ${theme}-theme`}
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
            {!isAdminPanelPage && (
              <>
              {showSearchInput && (
                <input
                  type="text"
                  // className="form-control me-2"
                  className={`form-control me-2 ${theme}-theme`}
                  placeholder="Search for a movie..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
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
              </>
            )}
            
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
                  // className="dropdown-menu dropdown-menu-end dropdown__style"
                  className={`dropdown-menu dropdown-menu-end dropdown__style ${theme}-theme`}
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
                      {/* {theme === "light" ? "Dark Mode" : "Light Mode"} */}
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
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
