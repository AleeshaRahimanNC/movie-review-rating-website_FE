import React, { useState } from "react";
import "./AuthPage.css";
import authImage from '@assets/background_img.jpeg'
import LoginBox from '../../Components/AuthBox/LoginBox'
import RegisterBox from '../../Components/AuthBox/RegisterBox'

function AuthPage() {
  const [boxType,setBoxType]=useState('login')
  return (
    <>
    <div className="background"> </div>

      <div className="container-fluid d-flex justify-content-center  align-items-center  vh-100 vw-100 authpage">
        <div className="row">
          <div
            className="col-md-6 left-image  "
            style={{ backgroundImage: `url(${authImage})` }}
          >
            <p>
               <h2>Welcome!</h2>
               <span className="new-line">To Our New Website,MysticMovies.</span></p>
          </div>

          <div className="col-md-6 right-side ">
            <h3 className="w-100 text-center mt-4 mb-4">
              {boxType === "login" ? "Login" : "Register"}
            </h3>
            {boxType === "login" ? (
              <LoginBox toggleBox={setBoxType} />
            ) : (
              <RegisterBox toggleBox={setBoxType} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
