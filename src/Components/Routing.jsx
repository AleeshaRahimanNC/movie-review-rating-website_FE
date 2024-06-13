import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../Pages/AuthPage/AuthPage";
// import Protected from './ProtectedRoute/ProtectedRoute'
import Home from "../Pages/Home/Home";
import AdminPanel from "../Pages/AdminPanel/AdminPanel";
import AddNewMovie from "../Pages/AddNewMovie/AddNewMovie";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";
import LandingPage from "../Pages/LandingPage/LandingPage";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/home" element={<LandingPage/>}></Route>
      <Route path="/home/movieDetails/:id" element={<MovieDetails />} />

      <Route path="/adminHome" element={<AdminPanel />} />
      <Route path="/adminHome/addNewMovie" element={<AddNewMovie />} />
    </Routes>
  );
}

export default Routing;
