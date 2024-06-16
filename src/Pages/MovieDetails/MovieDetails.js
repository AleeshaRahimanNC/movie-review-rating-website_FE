import React, { useState } from "react";
import "./MovieDetails.css";
import CusNavBar from "../../Components/Common/CusNavBar/CusNavBar";
import MovieDetailBody from "../../Components/MovieDetailBody/MovieDetailBody";
import { useParams } from "react-router-dom";
import Modal from "../../Components/Common/Modal/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/Common/CustomInput/CustomInput";
import AxiosInstance from "../../Config/apicall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons"; // Solid star icon
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"; // Regular star icon
import { ErrorToast, successToast } from "../../Plugins/Toast/Toast";
import MovieDetailReview from "../../Components/MovieDetailReview/MovieDetailReview";
import { useSelector } from "react-redux";
import Footer from "../../Components/Common/Footer/Footer";

function MovieDetails() {
  const { movieId } = useParams();
  const [openAddReview, setAddReview] = useState(false);
  const [rating, setRating] = useState(0);
  const { user } = useSelector((state) => state.user);
  const userName = user?.name || "User";


  // Formik form initialization and validation schema
  const formik = useFormik({
    initialValues: {
      title: "",
      reviewText: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      reviewText: Yup.string().required("Review text is required"),
    }),
    onSubmit: async (values) => {
      try {
        // If user has not reviewed, proceed to add the review
        const response = await AxiosInstance.post("/reviewRoutes/add", {
          movieId,
          title: values.title,
          reviewText: values.reviewText,
          rating: rating,
        });
        console.log("Review added:", response.data);
        successToast("Review Added Successfully");
        setAddReview(false);
        // Optionally, update movie details after adding review
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            ErrorToast(`Ah, ${userName}, you've already shared your review upon this film.`);
          } else if (error.response.status === 404) {
            ErrorToast("Movie not found");
          } else {
            ErrorToast("Failed to add review");
          }
        } else {
          ErrorToast("Failed to add review");
        }
        console.error("Failed to add review:", error);
        // Handle error (e.g., show error message)
      }
    },
  });

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <>
      <CusNavBar />
      <MovieDetailBody movieId={movieId} />

      <div className="container-fluid">
        <h3 className="public_heading">
          <strong>
            <em>Public Opinion</em>
          </strong>
        </h3>

        <div className="addReview_button">
          <button className="common-button" onClick={() => setAddReview(true)}>
            Add Review
          </button>
        </div>

        <MovieDetailReview movieId={movieId}/>
      </div>
      {openAddReview && (
        <Modal
          heading={"Add New Review"}
          closeModal={() => setAddReview(false)}
        >
          <form onSubmit={formik.handleSubmit} className="form__style">
            <div className="star-rating">
              <p>How would you rate it?</p>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={index < rating ? "star filled" : "star"}
                  onClick={() => handleStarClick(index + 1)}
                >
                  <FontAwesomeIcon icon={index < rating ? fasStar : farStar} />
                </span>
              ))}
            </div>

            <div className="form__input__style">
              <CustomInput
                type="text"
                label="Title:"
                name="title"
                value={formik.values.title}
                onchange={formik.handleChange}
                onblur={formik.handleBlur}
                error={formik.touched.title && formik.errors.title}
              />
            </div>

            <div className="">
              <CustomInput
                type="textarea"
                label="Review Text:"
                name="reviewText"
                value={formik.values.reviewText}
                onchange={formik.handleChange}
                onblur={formik.handleBlur}
                error={formik.touched.reviewText && formik.errors.reviewText}
              />
            </div>

            <div className="modal-buttons d-flex justify-content-center gap-5">
              <button
                type="button"
                className="movieBox-cancel"
                onClick={() => setAddReview(false)}
              >
                Cancel
              </button>
              <button type="submit" className="common-button">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Footer */}
      <Footer/>
    </>
  );
}

export default MovieDetails;
