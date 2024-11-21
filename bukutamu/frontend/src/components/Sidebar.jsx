import React from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import '../css/sidebar.css';

const Sidebar = () => {

  const Logout = () => {
    Swal.fire({
        title: 'Are you sure you want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log out',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("token");
            window.location.href = '/';
        }
    });
};

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="img bg-wrap text-center py-4" style={{backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLyUT2EH-eGpMvVTEfhN1CZs0LT1v1nzRrgw&s)'}}>
                <div className="user-logo">
                    <div className="img" style={{backgroundImage: 'url(https://tse1.mm.bing.net/th?id=OIP.LQWhgcuV9cI5oa22EPJhQwHaHa&pid=Api&P=0&h=180)'}} />
                    <h3>BUKU TAMU</h3>
                </div>
                </div>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="../dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Septian Angga Saputra
            </a>
          </div>
        </div>
        {/* SidebarSearch Form */}
        
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Dashboard Menu */}
            <li className="nav-item">
              <NavLink to="dashboard" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </NavLink>
            </li>

            {/* User Menu */}
            <li className="nav-item">
              <NavLink to="user" className="nav-link">
                <i className="nav-icon fas fa-user" />
                <p>User</p>
              </NavLink>
            </li>

            {/* Buku Tamu Menu */}
            <li className="nav-item">
              <NavLink to="buku-tamu" className="nav-link">
                <i className="nav-icon fa fa-book" />
                <p>Buku Tamu</p>
              </NavLink>
            </li>

            {/* Logout Menu */}
            <li className="nav-item">
              <NavLink onClickCapture={Logout} to="/logout" className="nav-link">
                <i className="nav-icon fas fa-sign-out-alt" />
                <p>Logout</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default Sidebar
