// import React, { useState } from "react";
import "./AuthBox.css";
import CustomInput from "../Common/CustomInput/CustomInput";
import axios from "axios";
import { ErrorToast, successToast } from "../../Plugins/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../Redux/userSlice";
import { useDispatch } from "react-redux";
import { showorhideLoader } from "../../Redux/generalSlice";
import { Formik, Form } from "formik";
import * as Yup from "yup";

function LoginBox({ toggleBox }) {
  // const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleLogin = (e) => {
  //   setLoginData({ ...loginData, [e.target.name]: e.target.value });
  // };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // const doLogin = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(showorhideLoader(true));
    axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL + "/authRoutes/dologin",
      // data: loginData,
      data: values,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(setUserData(res.data.user));
        navigate("/home");
        dispatch(showorhideLoader(false));
        successToast(`Welcome back, ${res.data.user.name}! You have successfully logged in.`);
        setSubmitting(false);
      })
      .catch((err) => {
        dispatch(showorhideLoader(false));
        ErrorToast(err?.response?.data.message || "something went wrong");
        setSubmitting(false);
      });
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
                type="email"
                label={"Email"}
                name={"email"}
                // value={loginData.email}
                // onchange={handleLogin}
                value={values.email}
                onblur={handleBlur}
                onchange={handleChange}
                error={touched.email && errors.email}
              />
            </div>

            <div className=" mt-4">
              <CustomInput
                type="password"
                label={"Password"}
                name={"password"}
                // value={loginData.password}
                // onchange={handleLogin}
                value={values.password}
                onblur={handleBlur}
                onchange={handleChange}
                error={touched.password && errors.password}
              />
            </div>
            <button
              type="submit"
              className="common-button mt-4 align-self-center "
              // onClick={doLogin}
            >
              {" "}
              Login
            </button>
            <p className="already-account mt-4 d-flex justify-content-center">
              New User...?{" "}
              <i onClick={() => toggleBox("register")}>Register Now</i>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginBox;
