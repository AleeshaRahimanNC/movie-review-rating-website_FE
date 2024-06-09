import React, { useEffect, useState } from "react";
import "./AuthBox.css";
import CustomInput from "../Common/CustomInput/CustomInput";


function RegisterBox({ toggleBox }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    console.log(name, email, password, confirmPassword);
  }, [name, email, password, confirmPassword]);

  const doRegister = ()=>{

  }

  return (
    <>
      <div className="d-flex flex-column">
        <div className="mt-4">
          <CustomInput
            type={"text"}
            label={"Name"}
            name={"name"}
            // value={signupData.firstName}
            // onchange={handleChange}
          />
        </div>

        <div className=" mt-4">
          <CustomInput
            type={"email"}
            label={"Email"}
            name={"email"}
            // value={signupData.email}
            // onchange={handleChange}
          />
        </div>

        <div className=" mt-4">
          <CustomInput
            type={"password"}
            label={"Password"}
            name={"password"}
            // value={signupData.passowrd}
            // onchange={handleChange}
          />
        </div>
        <div className=" mt-4">
          <CustomInput
            type={"password"}
            label={"Confirm Password"}
            name={"confirmPassword"}
            // value={signupData.confirmPassword}
            // onchange={handleChange}
          />
        </div>
        <button
          className="common-button mt-4 align-self-center "
          // onClick={doSignup}
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
