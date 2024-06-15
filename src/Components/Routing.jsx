import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../Pages/AuthPage/AuthPage";
// import Protected from './ProtectedRoute/ProtectedRoute'
// import Home from "../Pages/Home/Home";
import AdminPanel from "../Pages/AdminPanel/AdminPanel";
import AddNewMovie from "../Pages/AddNewMovie/AddNewMovie";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";
import LandingPage from "../Pages/LandingPage/LandingPage";
import ReviewDetails from "../Pages/ReviewDetails/ReviewDetails";
import Protected from "./ProtectedRoute/ProtectedRoute";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/home" element={<Protected><LandingPage/></Protected>}></Route>
      <Route path="/home/movieDetails/:movieId" element={<Protected><MovieDetails /></Protected>} />

      <Route path="/adminHome" element={<Protected><AdminPanel /></Protected>} />
      <Route path="/adminHome/addNewMovie" element={<Protected><AddNewMovie /></Protected>} />
      <Route path="/adminHome/reviewDetails/:userId" element={<Protected><ReviewDetails /></Protected>} />
    </Routes>
  );
}

export default Routing;
