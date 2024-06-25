import React, { useEffect, useState } from "react";
import "./MovieDetailBody.css";
import AxiosInstance from "../../Config/apicall";
import { ErrorToast } from "../../Plugins/Toast/Toast";
import { useDispatch } from "react-redux";
import { showorhideLoader } from "../../Redux/generalSlice";


function MovieDetailBody({movieId, refreshReviews}) {
    const [movieDetails, setMovieDetails] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMovieDetails = async () => {
          dispatch(showorhideLoader(true));
          try {
            const response = await AxiosInstance.get(`/movieRoutes/${movieId}`);
            setMovieDetails(response.data);
            dispatch(showorhideLoader(false));
            
          } catch (error) {
            dispatch(showorhideLoader(false));
            ErrorToast("Failed to fetch movie details");
            
          }
        };
    
        fetchMovieDetails();
      }, [movieId, refreshReviews]);

      if (!movieDetails) {
        return <div>No movie details found</div>;
      }
    

  return (
    <>
      <div className="details-page">
        <div className="details-image-box">
              <img className="details-main-img" src={movieDetails.moviePic} alt={movieDetails.title} />
              <div className="details-image-content d-flex justify-content-between p-4">
                  <div className="movie__description__wrapper d-flex flex-column justify-content-center text-white">
                  <h3>{movieDetails.title}</h3>
                  <div className=" movie-detail-para d-flex ">
                  <p>Director: {movieDetails.director}</p><span className="line__style">|</span>
                <p>Release Date: {new Date(movieDetails.releaseDate).toLocaleDateString()}</p><span className="line__style">|</span>
                <p>Genre: {movieDetails.genre ? movieDetails.genre.join(", ") : "N/A"}</p> <span className="line__style">|</span>
                <p>Category: {movieDetails.category}</p> <span className="line__style">|</span>
                <p>Rating: {movieDetails.aggregatedRating}</p><span className="line__style">|</span>
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
