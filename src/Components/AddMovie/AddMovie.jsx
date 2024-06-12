import React, { useRef, useState } from "react";
import "./AddMovie.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../Common/CustomInput/CustomInput";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showorhideLoader } from "../../Redux/generalSlice";
import { ErrorToast, successToast } from "../../Plugins/Toast/Toast";
import addIcon from "@assets/add_icon.svg";
import AxiosInstance from "../../Config/apicall";

function AddMovie() {
  const initialValues = {
    title: "",
    releaseDate: "",
    director: "",
    description: "",
    genre: "",
    category: "",
    moviePic: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    releaseDate: Yup.date().required("Release Date is required"),
    director: Yup.string().required("Director is required"),
    description: Yup.string().required("Description is required"),
    genre: Yup.string().required("Genre is required"),
    category: Yup.string().required("Category is required"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(showorhideLoader(true));

    // Create a FormData object
    const formData = new FormData();

    // Append each form value to the FormData object
    formData.append("title", values.title);
    formData.append("releaseDate", values.releaseDate);
    formData.append("director", values.director);
    formData.append("description", values.description);
    formData.append("genre", values.genre); // No need to split here, backend will handle it
    formData.append("category", values.category);

    // Append the file to the FormData object
    if (fileInputRef.current.files[0]) {
      formData.append("moviePic", fileInputRef.current.files[0]);
    }

    AxiosInstance({
      method: "POST",
      url: "/movieRoutes/addMovie",
      // data: {
      //   ...values,
      //   genre: values.genre.split(",").map((g) => g.trim()), // Convert genre string to array
      // },
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        successToast("Movie added successfully");
        navigate("/home");
        dispatch(showorhideLoader(false));
        setSubmitting(false);
      })
      .catch((err) => {
        dispatch(showorhideLoader(false));
        ErrorToast(err?.response?.data.message || "Something went wrong");
        setSubmitting(false);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form>
          <div className="container-fluid">
            <h3 className="heading-box">
              <strong>
                <em>Add New Movie</em>
              </strong>
            </h3>

            <div
              style={{ minHeight: "70vh" }}
              className="p-2 border border-3 border-black rounded-2 d-flex gap-3 px-3 mt-3 "
            >
              <div className="row">
                <div className="col-lg-4 col-md-6 mt-3">
                  <CustomInput
                    type={"text"}
                    label={"Title"}
                    name={"title"}
                    value={values.title}
                    onblur={handleBlur}
                    onchange={handleChange}
                    error={touched.title && errors.title}
                  />
                </div>

                <div className="col-lg-4 col-md-6 mt-3">
                  <CustomInput
                    type={"date"}
                    // label={"Release Date"}
                    name={"releaseDate"}
                    value={values.releaseDate}
                    onblur={handleBlur}
                    onchange={handleChange}
                    error={touched.releaseDate && errors.releaseDate}
                  />
                </div>

                <div className="col-lg-4 col-md-6 mt-3">
                  <CustomInput
                    type={"text"}
                    label={"Director"}
                    name={"director"}
                    value={values.director}
                    onblur={handleBlur}
                    onchange={handleChange}
                    error={touched.director && errors.director}
                  />
                </div>

                <div className="col-lg-4 col-md-6 mt-3">
                  <CustomInput
                    type={"textarea"}
                    label={"Description"}
                    name={"description"}
                    value={values.description}
                    onblur={handleBlur}
                    onchange={handleChange}
                    error={touched.description && errors.description}
                  />
                </div>

                <div className="col-lg-4 col-md-6 mt-3">
                  <CustomInput
                    type={"text"}
                    label={"Genre"}
                    name={"genre"}
                    value={values.genre}
                    onblur={handleBlur}
                    onchange={handleChange}
                    error={touched.genre && errors.genre}
                  />
                </div>

                <div className="col-lg-4 col-md-6 mt-3">
                  <CustomInput
                    type={"text"}
                    label={"Category"}
                    name={"category"}
                    value={values.category}
                    onblur={handleBlur}
                    onchange={handleChange}
                    error={touched.category && errors.category}
                  />
                </div>

                <div className="mt-3 mb-3">
                  <CustomInput
                    type={"file"}
                    // label={"Movie Image"}
                    name={"moviePic"}
                    fileInputRef={fileInputRef}
                    imageChange={handleImageChange}
                    selectedImage={selectedImage}
                    value={addIcon}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center gap-5 movieBox">
              <button className="movieBox-cancel">
                {" "}
                Cancel
              </button>
              <button type="submit" className="common-button ">
                {" "}
                Create
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddMovie;
