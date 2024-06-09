import { useState } from 'react'
import { Navigate } from "react-router-dom";
//childrens are the props
const Protected = ({ children }) => {
  const loggedIn = localStorage.getItem("token");
  const [log, setLog] = useState(loggedIn);
  return log ? children : <Navigate to="/" replace />;
};

export default Protected;
