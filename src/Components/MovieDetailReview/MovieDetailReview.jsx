import React, { useState, useEffect } from "react";
import AxiosInstance from "../../Config/apicall";
import "./MovieDetailReview.css";
import { ErrorToast, successToast } from "../../Plugins/Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../ThemeContext/ThemeContext";
import { showorhideLoader } from "../../Redux/generalSlice";

function MovieDetailReview({ movieId, refreshReviews }) {
  const [movieReviews, setMovieReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [noReviewsMessage, setNoReviewsMessage] = useState(""); // State to store no reviews message
  const { user } = useSelector((state) => state.user);
  const { theme } = useTheme();
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     const fetchReviews = async () => {
  //       try {
  //         // const response = await AxiosInstance.get(`/reviewRoutes/movie/${movieId}`);
  //         // console.log("API Response:", response.data);
  //         // if (response.data.reviews) {
  //         //   setMovieReviews(response.data.reviews);
  //         // } else {
  //         //   setMovieReviews([]);
  //         // }

  //         AxiosInstance.get(`/reviewRoutes/movie/${movieId}`).then((response) => {
  //           setMovieReviews(response.data);

  //         });
  //       } catch (error) {
  //         console.error("Failed to fetch reviews:", error);
  //       }
  //     };
  //     fetchReviews();
  //   }, [movieId]);

  useEffect(() => {
    const fetchReviews = async () => {
      dispatch(showorhideLoader(true));
      try {
        const response = await AxiosInstance.get(
          `/reviewRoutes/movie/${movieId}`
        );
        if (response.data.message) {
          // If response contains a message, set it as the noReviewsMessage
          setNoReviewsMessage(response.data.message);
          setMovieReviews([]); // Ensure movieReviews is set to empty array
          dispatch(showorhideLoader(false));
        } else {
          // Otherwise, set the reviews data
          setMovieReviews(response.data);
          setNoReviewsMessage(""); // Clear any previous noReviewsMessage
          dispatch(showorhideLoader(false));
        }
      } catch (error) {
        dispatch(showorhideLoader(false));
        console.error("Failed to fetch reviews:", error);
        ErrorToast("Failed to fetch reviews. Please try again later."); // Set error message
      }
    };

    fetchReviews();
  }, [movieId, refreshReviews]);

  const totalReviews = movieReviews.length;

  const indexOfLastReview = currentPage * perPage;
  const indexOfFirstReview = indexOfLastReview - perPage;
  const currentMovieReviews = movieReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(totalReviews / perPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const gotoPage = (page) => {
    if (page >= 1 && page <= Math.ceil(totalReviews / perPage)) {
      setCurrentPage(page);
    }
  };

  //   Delete function
  const deleteReview = async (reviewId) => {
    dispatch(showorhideLoader(true));
    try {
      const response = await AxiosInstance.delete(`/reviewRoutes/${reviewId}`);
      if (response.status === 200) {
        // If successful, update frontend state to reflect deleted status
        setMovieReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId ? { ...review, status: "deleted" } : review
          )
        );
        successToast(response.data.message)
        dispatch(showorhideLoader(false));
      }
    } catch (error) {
      dispatch(showorhideLoader(false));
      console.error("Error deleting review:", error);
      ErrorToast("Failed to delete review. Please try again later.");
    }
  };

  return (
    <>
      <div className="total-user-details table-responsive">
        {/* <table className="table second-table table-bordered table-dark table-hover"> */}
        <table className={`table second-table ${theme === 'light' ? 'table-light' : 'table-dark'} table-bordered table-hover`}>
          <thead>
            <tr>
              <th colSpan="8">Viewer Ratings and Reviews</th>
            </tr>
            <tr>
              <th>Sl.No.</th>
              {user.role === "admin" && <th>Id</th>}
              <th>Name</th>
              <th>Review Title</th>
              <th>Review</th>
              <th>Rating</th>
              {user.role === "admin" && <th>Status</th>}
              {user.role === "admin" && <th>Remove Review</th>}
            </tr>
          </thead>
          <tbody>
            {movieReviews.length > 0 ? (
              currentMovieReviews.map((review, index) => (
                <tr key={review._id}>
                  <td>{indexOfFirstReview + index + 1}</td>
                  {user.role === "admin" && <td>{review._id}</td>}
                  <td>{review.userId.name}</td>
                  <td>{review.title}</td>
                  <td>{review.reviewText}</td>
                  <td>{review.rating}</td>
                  {user.role === "admin" && <td>{review.status}</td>}
                  {user.role === "admin" && (
                    <td>
                      <button
                        className="common-button"
                        onClick={() => deleteReview(review._id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  {noReviewsMessage ||
                    "No reviews added yet. Be the first to add a review!"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination__wrapper">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  prevPage();
                }}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {Array.from(
              { length: Math.ceil(totalReviews / perPage) },
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      gotoPage(index + 1);
                    }}
                  >
                    {index + 1}
                  </a>
                </li>
              )
            )}
            <li
              className={`page-item ${
                currentPage === Math.ceil(totalReviews / perPage)
                  ? "disabled"
                  : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  nextPage();
                }}
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default MovieDetailReview;
