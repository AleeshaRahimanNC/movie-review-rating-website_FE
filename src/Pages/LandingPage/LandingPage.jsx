import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import CusNavBar from "../../Components/Common/CusNavBar/CusNavBar";
import CustomCarousal from "../../Components/CustomCarousal/CustomCarousal";
import MovieListBody from "../../Components/MovieListBody/MovieListBody";
import AxiosInstance from "../../Config/apicall";
import { ErrorToast } from "../../Plugins/Toast/Toast";
import Offcanvas from "react-bootstrap/Offcanvas";
import Footer from "../../Components/Common/Footer/Footer";

function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  // const [show, setShow] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null); // New state for selected genre

  console.log("select", selectedGenre);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedGenre(null);
  };

  const handleGenreSelect = (genre) => {
    console.log("hghg", genre);
    setSelectedGenre(genre);
    setSelectedCategory(null); // Reset selected category when genre is selected
    handleClose();
  };

  const fetchTopRatedMovies = () => {
    AxiosInstance.get("/movieRoutes", { params: { genre: "top-rated" } })
      .then((resp) => {
        setTopRatedMovies(resp.data);
      })
      .catch((err) => {
        console.log(err);
        ErrorToast("Something went wrong while fetching top-rated movies");
      });
  };

  return (
    <>
      <CusNavBar onCategorySelect={handleCategorySelect} />
      <CustomCarousal topRatedMovies={topRatedMovies} />
      <div className="genre__style__wrapper">
        <button className="common-button" onClick={handleShow}>
          Filter
        </button>
      </div>


      <Offcanvas style={{    width: "20%",
      backgroundColor:"#362c2cf2"

}} show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header style={{backgroundColor:"white"}} closeButton>
          <Offcanvas.Title>Genre</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
          <button
            className="common-button"
            onClick={() => handleGenreSelect("Action")}
          >
            Action
          </button>
          <button
            className="common-button"
            onClick={() => handleGenreSelect("Thriller")}
          >
            Thriller
          </button>
          <button
            className="common-button"
            onClick={() => handleGenreSelect("Comedy")}
          >
            Comedy
          </button>
          <button
            className="common-button"
            onClick={() => handleGenreSelect("Drama")}
          >
            Drama
          </button>
          <button
            className="common-button"
            onClick={() => handleGenreSelect("Horror")}
          >
            Horror
          </button>
          <button
            className="common-button"
            onClick={() => handleGenreSelect("Animation")}
          >
            Animation
          </button>
          <button
            className="common-button"
            onClick={() => handleGenreSelect("Adventure")}
          >
            Adventure
          </button>
          <button
            className="common-button"
            onClick={() => handleGenreSelect("Science Fiction")}
          >
            Science Fiction
          </button>
          <button
        
            className="common-button"
            onClick={() => handleGenreSelect("Romance")}
          >
            Romance
          </button>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-flex flex-column vh-100">
        <MovieListBody category={selectedCategory} genre={selectedGenre} />
      </div>

      {/* Footer */}
      <Footer/>
    </>
  );
}

export default LandingPage;
