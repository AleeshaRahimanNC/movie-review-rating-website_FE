// import React, { useEffect, useState } from "react";
// import "./Home.css";
// import CusNavBar from "../../Components/Common/CusNavBar/CusNavBar";
// import CustomCarousal from "../../Components/CustomCarousal/CustomCarousal";
// import MovieListBody from "../../Components/MovieListBody/MovieListBody";
// import AxiosInstance from "../../Config/apicall";
// import { ErrorToast } from "../../Plugins/Toast/Toast";
// import { Button, Offcanvas } from "react-bootstrap";

// function Home() {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [topRatedMovies, setTopRatedMovies] = useState([]);
//   // const [show, setShow] = useState(false);
//   const [selectedGenre, setSelectedGenre] = useState(null); // New state for selected genre

//   console.log("select",selectedGenre)

//   // const handleClose = () => setShow(false);
//   // const handleShow = () => setShow(true);

//   useEffect(() => {
//     fetchTopRatedMovies();
//   }, []);

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setSelectedGenre(null); 
//   };

//   const handleGenreSelect = (genre) => {
//     console.log("hghg",genre)
//     setSelectedGenre(genre);
//     setSelectedCategory(null); // Reset selected category when genre is selected
//     // handleClose();
//   };


//   const fetchTopRatedMovies = () => {
//     AxiosInstance.get("/movieRoutes", { params: { genre: "top-rated" } })
//       .then((resp) => {
//         setTopRatedMovies(resp.data);
//       })
//       .catch((err) => {
//         console.log(err);
//         ErrorToast("Something went wrong while fetching top-rated movies");
//       });
//   };

//   return (
//     <>
//       <CusNavBar onCategorySelect={handleCategorySelect} />
//       <CustomCarousal topRatedMovies={topRatedMovies} />
//       <div className="d-flex flex-column vh-100">
//         <MovieListBody category={selectedCategory} genre={selectedGenre} />
//       </div>
//     </>
//   );
// }

// export default Home;
