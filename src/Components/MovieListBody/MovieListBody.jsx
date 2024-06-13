import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import AxiosInstance from "../../Config/apicall";
import { ErrorToast } from "../../Plugins/Toast/Toast";

function MovieListBody({ category, genre }) {
  const [movies, setMovies] = useState([]);

  //   useEffect(() => {
  //     // Example of fetching movies from an API endpoint
  //     fetchMovies();
  //   }, []);

  useEffect(() => {
    if (category) {
      fetchMoviesByCategory(category);
    } else if (genre) {
      fetchMoviesByGenre(genre);
    } else {
      fetchAllMovies();
    }
  }, [category, genre]);

  const fetchMoviesByCategory = (category) => {
    AxiosInstance.get("/movieRoutes", {
      params: { category: category },
    })
      .then((resp) => {
        setMovies(resp.data);
      })
      .catch((err) => {
        console.log(err);
        ErrorToast("Something went wrong");
      });
  };

  const fetchMoviesByGenre = (genre) => {
    AxiosInstance.get("/movieRoutes", {
      params: { genre: genre },
    })
      .then((resp) => {
        setMovies(resp.data);
      })
      .catch((err) => {
        console.log(err);
        ErrorToast("Something went wrong");
      });
  };

  const fetchAllMovies = () => {
    AxiosInstance.get("/movieRoutes/")
      .then((resp) => {
        setMovies(resp.data);
      })
      .catch((err) => {
        console.log(err);
        ErrorToast("Something went wrong");
      });
  };

  return (
    <div className="movie-list flex-flex-grow-1 d-flex flex-wrap justify-content-center  overflow-y-auto  gap-3 p-3">
      {movies.map((movie) => (
        <Cards key={movie._id} movies={movie} />
      ))}
    </div>
  );
}

export default MovieListBody;
