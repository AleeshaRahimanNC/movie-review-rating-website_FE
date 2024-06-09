import React from "react";
import "./AuthBox.css";
import CustomInput from "../Common/CustomInput/CustomInput";

function LoginBox({toggleBox}) {
  return (
    <>
      <div className="d-flex flex-column">
        <div className="mt-4">
          <CustomInput
            label={"Email"}
            // value={loginData.email}
            name={"email"}
            // onchange={handleLogin}
          />
        </div>

        <div className=" mt-4">
          <CustomInput
            label={"Password"}
            // value={loginData.password}
            name={"password"}
            // onchange={handleLogin}
          />
        </div>
        <button
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
      </div>
    </>
  );
}

export default LoginBox;
