import React, { useEffect, useState } from "react";
import "./ReviewList.css";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../Config/apicall";

// import { useDispatch } from "react-redux";
// import { showorhideLoader } from "../../Redux/generalSlice";

function ReviewList() {
  const { userId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [toastShown, setToastShown] = useState(false);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (userId) {
  //     fetchUserReviews();
  //   }
  // }, [userId]);

  // const fetchUserReviews = () => {
  //   AxiosInstance.get(`/adminRoutes/user-reviews/${userId}`)
  //     .then((response) => {
  //       setReviews(response.data);
  //     })
  //     .catch((err) => {
  //       if (err.response && err.response.status === 404) {
  //         if (!toastShown) {
  //           ErrorToast("No reviews found for this user");
  //           setToastShown(true); // Set toast shown state to true to prevent duplicate toasts
  //         }
  //       } else {
  //         console.error("Error fetching user reviews:", err);
  //         ErrorToast("Failed to fetch user reviews");
  //       }
  //     });
  // };

  useEffect(() => {
    const fetchUserReviews = () => {
      AxiosInstance.get(`/adminRoutes/user-reviews/${userId}`)
        .then((response) => {
          setReviews(response.data);

          setToastShown(true); // Reset toast shown state when data is successfully fetched
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            if (!toastShown) {
              setToastShown(false); // Set toast shown state to true to prevent duplicate toasts
            }
          } else {
            console.error("Error fetching user reviews:", err);
          }
        });
    };

    fetchUserReviews();
  }, [userId, toastShown]);



  // Calculate pagination boundaries
  const indexOfLastReview = currentPage * perPage;
  const indexOfFirstReview = indexOfLastReview - perPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const gotoPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container-fluid">
      <div className="review-details table-responsive">
        <table className="table table-bordered table-dark table-hover">
          <thead>
            <tr>
              <th colSpan="7">User Review Details</th>
            </tr>
            <tr>
              <th>Sl.No.</th>
              <th>Id</th>
              <th>Movie Name</th>
              <th>Review Title</th>
              <th>Review</th>
              <th>Rating</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              currentReviews.map((review, index) => (
                <tr key={review._id}>
                  <td>{indexOfFirstReview + index + 1}</td>
                  <td>{review._id}</td>
                  <td>{review.movieName}</td>
                  <td>{review.title}</td>
                  <td>{review.review}</td>
                  <td>{review.rating}</td>
                  <td>{review.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No reviews found for this user.
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
                onClick={prevPage}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {Array.from(
              { length: Math.ceil(reviews.length / perPage) },
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
                    onClick={() => gotoPage(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              )
            )}
            <li
              className={`page-item ${
                currentPage === Math.ceil(reviews.length / perPage)
                  ? "disabled"
                  : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={nextPage}
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ReviewList;
