import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const User = () => {
  const [dataUser, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const tampilData = async () => {
    const response = await fetch("http://localhost:3000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUsers(data);
  };
  useEffect(() => {
    tampilData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Yakin menghapus data?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/api/users/" + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((res) => {
            window.location.reload();
          });
      }
    });
  };

return (
  <>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col">
            <div className="m-0">Data User</div>
          </div>
          <div className="col">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">User</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Link to="/admin/adduser" className="btn btn-primary">
              Tambah User
            </Link>
            <table className="table table-striped table-bordered mt-2">
              
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Edit</th>
                  <th>Hapus</th>
                </tr>
              </thead>

              <tbody>
                {dataUser.length > 0 ? (
                  dataUser.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.nama}</td>
                      <td>{item.email}</td>
                      <td>
                        <Link
                          to={`/admin/edituser/${item.id}`}
                          className="btn btn-warning">Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn btn-danger">Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Tidak ada data</td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </section>
  </>
);
};

export default User;
