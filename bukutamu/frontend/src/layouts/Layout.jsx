import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Preload from "../components/Preload";
// import BukuTamu from '../components/BukuTamu';

const Layout = () => {
  useEffect(() => {
    if(localStorage.getItem('token')=== null){
      window.location.href = '/'
    }
  }, [])
  return (
    <div className="wrapper">
      <Preload />
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
