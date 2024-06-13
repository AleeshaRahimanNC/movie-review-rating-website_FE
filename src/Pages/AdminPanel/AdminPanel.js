import React from "react";
import "./AdminPanel.css";
import CusNavBar from "../../Components/Common/CusNavBar/CusNavBar";
import { useNavigate } from "react-router-dom";


function AdminPanel() {
  const navigate = useNavigate();

  const handleAddNewMovie = () => {
    navigate("/adminHome/addNewMovie");
  };

  return (
    <>
      <CusNavBar />
      
      <div>
        <h1>Admin Panel</h1>
        <button onClick={handleAddNewMovie}>Add Movie</button>
      </div>
      
    </>
  );
}

export default AdminPanel;
