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
      <div
        className="card-header text-center"
        style={{
          backgroundColor: "#e63946",
          color: "white",
          padding: "1rem",
          display: "flex",
          position:"unset",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1170px",
          width: "100%",
          margin: "0 auto",
          borderRadius:"4px",
        }}
      >
        {/* Gambar Kiri */}
        <img
          src="../dist/img/logo.png"
          alt="Logo Kiri"
          style={{
            width: "50px",
            height: "50px",
            marginRight: "10px",
          }}
        />

        {/* Teks Judul dan Deskripsi */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: "1.8rem" }}>Data Pengguna Buku</h2>
          <p style={{ fontSize: "1rem", margin: "0", color: "white" }}>
            Data Pengguna Buku Tamu SMK NEGERI 1 PONOROGO
          </p>
        </div>

        {/* Gambar Kanan */}
        <img
          src="../dist/img/smk.png"
          alt="Logo Kanan"
          style={{
            width: "50px",
            height: "50px",
            marginLeft: "10px",
          }}
        />
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
  to="/admin/adduser"
  className="btn btn-primary"
  style={{
    borderRadius: "5px",
    padding: "10px 20px",
    marginTop:"10px",
    fontSize: "1rem",
    background: "linear-gradient(45deg, #e63946, #d4a5a5)", // Gradasi merah terang ke merah gelap
    color: "#fff", // Warna teks putih agar kontras dengan latar belakang
    border: "none", // Menghilangkan border default
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Tambahkan bayangan halus agar tombol lebih menonjol
    transition: "all 0.3s ease", // Menambahkan transisi halus pada hover
  }}
  onMouseEnter={(e) => {
    // Hover effect untuk membuat tombol lebih menarik
    e.target.style.background = "linear-gradient(45deg, #d4a5a5, #e63946)";
    e.target.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    // Mengembalikan ke warna semula saat mouse meninggalkan tombol
    e.target.style.background = "linear-gradient(45deg, #e63946, #d4a5a5)";
    e.target.style.transform = "scale(1)";
  }}
>
  Tambah User
</Link>

        </div>
              <table className="table table-striped table-bordered mt-2">
                <thead className="table-light">
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
                            className="btn btn-warning btn-sm"
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="btn btn-danger btn-sm"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Tidak ada data
                      </td>
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
