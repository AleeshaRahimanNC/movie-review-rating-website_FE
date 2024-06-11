import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../Pages/AuthPage/AuthPage";
// import Protected from './ProtectedRoute/ProtectedRoute'
import Home from "../Pages/Home/Home";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default Routing;
