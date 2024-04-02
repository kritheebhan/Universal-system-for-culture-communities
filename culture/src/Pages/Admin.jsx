import React, { useState, useEffect } from 'react';

function AdminHome() {
  const [users, setUsers] = useState([]);

  // Fetch user data from backend API
  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}` // Include authorization token
      }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Log the received data
      if (data.status === "ok") {
        setUsers(data.data);
      } else {
        alert("Failed to fetch user data");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong");
    });
  }, []);


  // Function to handle user deletion
  const handleDelete = (userId) => {
    fetch(`http://localhost:5000/deleteUser/${userId}`, {
      method: "DELETE",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}` // Include authorization token
      }
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "ok") {
        // Filter out the deleted user from the state
        setUsers(users.filter(user => user._id !== userId));
        alert("User deleted successfully");
      } else {
        alert("Failed to delete user");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong");
    });
  };

  return (
    <div className='mt-20'>
      <h2>User Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.userType}</td>
              <td><button onClick={() => handleDelete(user._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminHome;
