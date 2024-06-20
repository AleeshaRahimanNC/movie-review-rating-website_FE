import React, { useEffect, useState } from "react";
import "./UserList.css";
import AxiosInstance from "../../Config/apicall";
import { ErrorToast, successToast } from "../../Plugins/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext/ThemeContext";

function UserList() {
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [recentUsersCount, setRecentUsersCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [recentUsers, setRecentUsers] = useState([]);
  const navigate = useNavigate();
  const { theme } = useTheme();


  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Function to get dashboard data
  const fetchDashboardData = () => {
    AxiosInstance.get("/adminRoutes/dashboard-data")
      .then((response) => {
        const { totalUsersCount, recentUsersCount, totalUsers, recentUsers } =
          response.data;
        setTotalUsersCount(totalUsersCount);
        setRecentUsersCount(recentUsersCount);
        setTotalUsers(totalUsers);
        setRecentUsers(recentUsers);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        ErrorToast("Failed to fetch dashboard data"); // Show error toast if fetch fails
      });
  };

  // Calculate pagination boundaries
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const currentUsers = totalUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const gotoPage = (page) => {
    setCurrentPage(page);
  };

  // Function to update user status to either 'inactive' or 'banned'
  const updateUserStatus = (userId, status) => {
    AxiosInstance.delete(`/adminRoutes/delete-user/${userId}`, {
      data: { status: status },
    })
      .then((response) => {
        console.log(response.data.message);
        successToast(response.data.message);
        // Update the user list after status update
        fetchDashboardData();
      })
      .catch((err) => {
        console.error("Error updating user status:", err);
        ErrorToast("Failed to update user status");
      });
  };

  // Function to reactivate user status
  const reactivateUserStatus = (userId, status) => {
    AxiosInstance.put(`/adminRoutes/reactivate-user/${userId}`, {
      data: { status: status },
    })
      .then((response) => {
        console.log(response.data.message);
        successToast(response.data.message);
        // Update the user list after status update
        fetchDashboardData();
      })
      .catch((err) => {
        console.error("Error updating user status:", err);
        ErrorToast("Failed to update user status");
      });
  };

// redirect in to the review detail page.
  const handleUserClick = (userId) => {
    navigate(`/adminHome/reviewDetails/${userId}`);
  };

  return (
    <>
      <div>
        {/* Total Count */}
        <div className="total-count table-responsive">
          <table
            // class="table first_table table-bordered table-dark table-hover"
            className={`table first_table ${theme === 'light' ? 'table-light' : 'table-dark'} table-bordered table-hover`}
            style={{ width: "50%", margin: "0 auto", tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th colSpan="2">Total Count</th>
              </tr>
              <tr>
                <th>Recent Users</th>
                <th>Total Users</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{recentUsersCount}</td>
                <td>{totalUsersCount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total User Table */}
        <div className="total-user-details table-responsive">
          {/* <table class="table second-table table-bordered table-dark table-hover"> */}
            <table className={`table second-table ${theme === 'light' ? 'table-light' : 'table-dark'} table-bordered table-hover`}>
            <thead>
              <tr>
                <th colSpan="9">Total User Details</th>
              </tr>
              <tr>
                <th>Sl.No.</th>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created_At</th>
                <th>Status</th>
                <th>Remove User</th>
                <th>Reactivate User</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{indexOfFirstUser + index + 1}</td>
                  <td
                    onClick={() => handleUserClick(user._id)}
                    style={{ cursor: "pointer", color: "#FF0000" }}
                  >
                    {user._id}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>{user.status}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="common-button dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton${index}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Delete
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby={`dropdownMenuButton${index}`}
                      >
                        <li>
                          <span
                            className="dropdown-item"
                            onClick={() =>
                              updateUserStatus(user._id, "inactive")
                            }
                          >
                            Inactive
                          </span>
                        </li>
                        <li>
                          <span
                            className="dropdown-item"
                            onClick={() => updateUserStatus(user._id, "banned")}
                          >
                            Banned
                          </span>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <button
                      className="common-button"
                      onClick={() => reactivateUserStatus(user._id, "active")}
                    >
                      Activate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination__wrapper">
          <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={prevPage}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {Array.from(
              { length: Math.ceil(totalUsers.length / perPage) },
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => gotoPage(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              )
            )}
            <li
              className={`page-item ${
                currentPage === Math.ceil(totalUsers.length / perPage)
                  ? "disabled"
                  : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={nextPage}
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        </div>
        

        {/* Recent User Table */}
        <div className="recent-user-details table-responsive">
          {/* <table class="table third-table table-bordered table-dark table-hover"> */}
            <table className={`table third-table ${theme === 'light' ? 'table-light' : 'table-dark'} table-bordered table-hover`}>
            <thead>
              <tr>
                <th colSpan="7">Recent User Details</th>
              </tr>
              <tr>
                <th>Sl.No.</th>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created_At</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td
                    onClick={() => handleUserClick(user._id)}
                    style={{ cursor: "pointer", color: "#FF0000" }}
                  >
                    {user._id}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserList;
