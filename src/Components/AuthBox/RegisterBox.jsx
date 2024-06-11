// import React, { useState } from "react";
import "./AuthBox.css";
import CustomInput from "../Common/CustomInput/CustomInput";
import axios from "axios";
import { ErrorToast, successToast } from "../../Plugins/Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { showorhideLoader } from "../../Redux/generalSlice";
import { Formik, Form } from "formik";
import * as Yup from "yup";

function RegisterBox({ toggleBox }) {
  // const [registerData, setRegisterData] = useState({});
  const { showLoader } = useSelector((store) => store.general);
  const dispatch = useDispatch();

  // const handleChange = (e) => {
  //   setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  // };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // const doRegister = () => {
    const handleSubmit = (values, { setSubmitting }) => {
      dispatch(showorhideLoader(true));
    // if (registerData.password === registerData.confirmPassword) {
      axios({
        method: "POST",
        url: process.env.REACT_APP_API_URL + "/authRoutes/doregister",
        // data: registerData,
        data: values,
      })
        .then((res) => {
          successToast(res.data.message);
          toggleBox("login");
          dispatch(showorhideLoader(false));
          setSubmitting(false);
        })
        .catch((err) => {
          dispatch(showorhideLoader(false));
          ErrorToast(err?.response?.data.message || "something went wrong");
          setSubmitting(false);
        });
      
    // } else {
    //   ErrorToast("Passwords are not matching");
    // }
  };

  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
      // <div className="d-flex flex-column">
      <Form className="d-flex flex-column">
        <div className="mt-4">
          <CustomInput
            type={"text"}
            label={"Name"}
            name={"name"}
            // value={registerData.name}
            // onchange={handleChange}
            value={values.name}
              onblur={handleBlur}
              onchange={handleChange}
              error={touched.name && errors.name}
          />
        </div>

        <div className=" mt-4">
          <CustomInput
            type={"email"}
            label={"Email"}
            name={"email"}
            // value={registerData.email}
            // onchange={handleChange}
            value={values.email}
              onblur={handleBlur}
              onchange={handleChange}
              error={touched.email && errors.email}
          />
        </div>

        <div className=" mt-4">
          <CustomInput
            type={"password"}
            label={"Password"}
            name={"password"}
            // value={registerData.passowrd}
            // onchange={handleChange}
            value={values.password}
              onblur={handleBlur}
              onchange={handleChange}
              error={touched.password && errors.password}
          />
        </div>
        <div className=" mt-4">
          <CustomInput
            type={"password"}
            label={"Confirm Password"}
            name={"confirmPassword"}
            // value={registerData.confirmPassword}
            // onchange={handleChange}
            value={values.confirmPassword}
            onblur={handleBlur}
            onchange={handleChange}
            error={touched.confirmPassword && errors.confirmPassword}
          />
        </div>
        <button
        type="submit"
          className="common-button mt-4 align-self-center "
          // onClick={doRegister}
        >
          {" "}
          Register
        </button>
        <p className="already-account mt-4 d-flex justify-content-center">
          Already have an account...?{" "}
          <i onClick={() => toggleBox("login")}>login here </i>
        </p>
      </Form>
      )}
      </Formik>
    </>
  );
}

export default RegisterBox;
