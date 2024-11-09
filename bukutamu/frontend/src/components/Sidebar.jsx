import React from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

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
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src="../dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>
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
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
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

export default Sidebar;
