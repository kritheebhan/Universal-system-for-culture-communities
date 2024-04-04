import React, { useEffect, useState } from "react";
import delet from '../components/images/delete.png';

export default function Admin({ userData }) {
  const [data, setData] = useState([]);
  const [userCount, setUserCount] = useState(0); // State to store user count

  useEffect(() => {
    getAllUser();
    getUserCount(); // Fetch signed-in user count when component mounts
  },[]);

  // Fetch all users
  const getAllUser = () => {
    fetch(`http://localhost:5000/getAllUser`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  // Fetch signed-in user count
  const getUserCount = () => {
    fetch(`http://localhost:5000/getUserCount`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserCount(data.count); // Update user count state
      });
  };

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    }
  };

  return (
    <div>
      <div className="bg-blue-600 h-56">
        <h2 className='text-white font-bold text-3xl mt-16 pt-10 pl-10'>Dashboard</h2>
        <div className="mx-40 flex justify-between ">
          <div class="box-content mt-16 h-36 w-56 p-4 drop-shadow-xl rounded-lg bg-white ">
            <h2 className="text-xl font-bold px-2 ">Users </h2>
            <h2 className="text-6xl font-bold px-2 mt-6 text-slate-600">{userCount}</h2> {/* Display user count here */}
          </div>
          <div class="box-content mt-16 h-36 w-56 p-4 drop-shadow-xl rounded-lg bg-white ">
            <h2 className="text-xl font-bold px-2 ">Admin</h2>
          </div>
          <div class="box-content mt-16 h-36 w-56 p-4 drop-shadow-xl rounded-lg bg-white ">
            <h2 className="text-xl font-bold px-2 ">Dataset</h2>
          </div>
          <div class="box-content mt-16 h-36 w-56 p-4 drop-shadow-xl rounded-lg bg-white ">
            <h2 className="text-xl font-bold px-2 ">Signup</h2>
          </div>
        </div>
      </div>
      <div className=" flex justify-center items-center bg-slate-100">
        <div className="mb-20">
          <table className="User-table border-slate-300">
            <thead>
              <tr className='bg-white border border-slate-300'>
                <th className="py-3 text-start px-10 text-lg">User Details</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <tr className='bg-slate-100 text-slate-600 '>
                <th className='py-2 text-start px-10'>Name</th>
                <th className='text-start '>Email</th>
                <th className='text-start '>User Type</th>
                <th className='text-start'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map(i => {
                return (
                  <tr key={i._id} className="border border-slate-300">
                    <td className='py-3 pl-10'>{i.name}</td>
                    <td className='py-3'>{i.email}</td>
                    <td className='py-3'>{i.userType}</td>
                    <td className='py-3'><img src={delet} alt="" className="h-7" onClick={() => deleteUser(i._id, i.name)} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
