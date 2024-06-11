import React, { useState } from "react";
import "./AuthBox.css";
import CustomInput from "../Common/CustomInput/CustomInput";
import axios from "axios";
import { ErrorToast, successToast } from "../../Plugins/Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { showorhideLoader } from "../../Redux/generalSlice";

function RegisterBox({ toggleBox }) {
  const [registerData, setRegisterData] = useState({});
  const {showLoader} =useSelector((store=>store.general))
  const dispatch=useDispatch();

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const doRegister = () => {
    dispatch(showorhideLoader(true))
    if (registerData.password === registerData.confirmPassword) {
      axios({
        method: "POST",
        url: process.env.REACT_APP_API_URL + "/authRoutes/doregister",
        data: registerData,
      })
        .then((res) => {
          successToast(res.data.message);
          toggleBox("login");
          dispatch(showorhideLoader(false))
        })
        .catch((err) => {
          dispatch(showorhideLoader(false))
          ErrorToast(err?.response?.data.message || "something went wrong");
        });
    } else {
      ErrorToast("Passwords are not matching");
    }
  };

  return (
    <>
      <div className="d-flex flex-column">
        <div className="mt-4">
          <CustomInput
            type={"text"}
            label={"Name"}
            name={"name"}
            value={registerData.name}
            onchange={handleChange}
          />
        </div>

        <div className=" mt-4">
          <CustomInput
            type={"email"}
            label={"Email"}
            name={"email"}
            value={registerData.email}
            onchange={handleChange}
          />
        </div>

        <div className=" mt-4">
          <CustomInput
            type={"password"}
            label={"Password"}
            name={"password"}
            value={registerData.passowrd}
            onchange={handleChange}
          />
        </div>
        <div className=" mt-4">
          <CustomInput
            type={"password"}
            label={"Confirm Password"}
            name={"confirmPassword"}
            value={registerData.confirmPassword}
            onchange={handleChange}
          />
        </div>
        <button
          className="common-button mt-4 align-self-center "
          onClick={doRegister}
        >
          {" "}
          Register
        </button>
        <p className="already-account mt-4 d-flex justify-content-center">
          Already have an account...?{" "}
          <i onClick={() => toggleBox("login")}>login here </i>
        </p>
      </div>
    </>
  );
}

export default RegisterBox;
