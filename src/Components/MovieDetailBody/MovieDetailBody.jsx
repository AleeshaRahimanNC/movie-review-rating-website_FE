import React, { useEffect, useState } from "react";
import "./MovieDetailBody.css";
import AxiosInstance from "../../Config/apicall";
import { ErrorToast } from "../../Plugins/Toast/Toast";


function MovieDetailBody({movieId}) {
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
          try {
            const response = await AxiosInstance.get(`/movieRoutes/${movieId}`);
            setMovieDetails(response.data);
            
          } catch (error) {
            ErrorToast("Failed to fetch movie details");
            
          }
        };
    
        fetchMovieDetails();
      }, [movieId]);

      if (!movieDetails) {
        return <div>No movie details found</div>;
      }
    

  return (
    <>
      <div className="details-page">
        <div className="details-image-box">
              <img className="details-main-img" src={movieDetails.moviePic} alt={movieDetails.title} />
              <div className="details-image-content d-flex justify-content-between p-4">
                  <div className="d-flex flex-column justify-content-center text-white">
                  <h3>{movieDetails.title}</h3>
                  <div className=" movie-detail-para d-flex ">
                  <p>Director: {movieDetails.director}</p>|
                <p>Release Date: {new Date(movieDetails.releaseDate).toLocaleDateString()}</p>|
                <p>Genre: {movieDetails.genre ? movieDetails.genre.join(", ") : "N/A"}</p>|
                <p>Category: {movieDetails.category}</p>|
                <p>Rating: {movieDetails.aggregatedRating}</p>|
                <p>Description: {movieDetails.description}</p>
                  </div>
                  </div>

                  {/* <div className="align-self-end d-flex gap-3">

                  </div> */}
              </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetailBody;
