import React from 'react';
import './App.css';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Navebar from './components/Navebar';
import Navbar1 from './components/Navebar1';
import Adminnavbar from './components/Admin_navbar'
import Home1 from "./Pages/Home1";
import Dataset from './Pages/Dataset'
import Search from './Pages/Search'
import Map from "./Pages/Map";
import Admin from "./Pages/Admin";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn")

  const location = useLocation();
  const isHome = location.pathname === '/';
  const isHome1 = location.pathname === '/Home1';
  const isDataset = location.pathname === '/Dataset';
  const isSearch = location.pathname === '/Search';
  const isMap = location.pathname === '/Map';
  const isAdmin = location.pathname === '/Admin';


  return (
    <>
      {(isHome ) && <Navebar />}
      {(isLoggedIn === "true" && (isHome1 || isDataset || isSearch || isMap )) && <Navbar1 />}
      {(isAdmin) && <Adminnavbar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Home1" element={isLoggedIn === "true" ? <Home1/> : <Navigate to="/Signin" />} />
        <Route path="/Dataset" element={<Dataset />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/Adminnavbar" element={<Adminnavbar />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </>
  );
}   

export default App;
