import React from "react";
import "./AdminPanel.css";
import CusNavBar from "../../Components/Common/CusNavBar/CusNavBar";
import { useNavigate } from "react-router-dom";
import UserList from "../../Components/UserList/UserList";

function AdminPanel() {
  const navigate = useNavigate();

  const handleAddNewMovie = () => {
    navigate("/adminHome/addNewMovie");
  };

  return (
    <>
      <CusNavBar />

      <div className="container-fluid">
        <h1 className="admin_heading">
          <strong>
            <em>Admin Panel</em>
          </strong>
        </h1>

        <div className="addMovie_button">
          <button className="common-button" onClick={handleAddNewMovie}>Add Movie</button>
        </div>

        <UserList />
      </div>
    </>
  );
}

export default AdminPanel;
