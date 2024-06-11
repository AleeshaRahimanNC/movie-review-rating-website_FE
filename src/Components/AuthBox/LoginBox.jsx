import React, { useState } from "react";
import "./AuthBox.css";
import CustomInput from "../Common/CustomInput/CustomInput";
import axios from "axios";
import { ErrorToast, successToast } from "../../Plugins/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../Redux/userSlice";
import { useDispatch } from "react-redux";
import { showorhideLoader } from "../../Redux/generalSlice";

function LoginBox({toggleBox}) {

  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const doLogin = () => {
    dispatch(showorhideLoader(true));
    axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL + "/authRoutes/dologin",
      data: loginData,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(setUserData(res.data.user));
        navigate("/home");
        dispatch(showorhideLoader(false)); 
        successToast(res.data.message);
      })
      .catch((err) => {
        dispatch(showorhideLoader(false));
        ErrorToast(err?.response?.data.message || "something went wrong");
      });
  };

  return (
    <>
      <div className="d-flex flex-column">
        <div className="mt-4">
          <CustomInput
            label={"Email"}
            value={loginData.email}
            name={"email"}
            onchange={handleLogin}
          />
        </div>

        <div className=" mt-4">
          <CustomInput
            label={"Password"}
            value={loginData.password}
            name={"password"}
            onchange={handleLogin}
          />
        </div>
        <button
          className="common-button mt-4 align-self-center "
          onClick={doLogin}
        >
          {" "}
          Login
        </button>
        <p className="already-account mt-4 d-flex justify-content-center">
        New User...?{" "}
          <i onClick={() => toggleBox("register")}>Register Now</i>
        </p>
      </div>
    </>
  );
}

export default LoginBox;
