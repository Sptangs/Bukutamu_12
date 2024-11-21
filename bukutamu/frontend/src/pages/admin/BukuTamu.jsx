import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaBook } from 'react-icons/fa'; 


const BukuTamu = () => {
  const [dataTamu, setTamu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;
  const token = localStorage.getItem('token');

  const tampilData = async () => {
    const response = await fetch("http://localhost:3000/api/bukutamu", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await response.json();
    setTamu(data);
  };

  useEffect(() => {
    tampilData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Yakin Akan Dihapus Data Nya ???",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:3000/api/bukutamu/' + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          } 
        })
          .then(response => response.json())
          .then(() => {
            tampilData();
          });
      }
    });
  };

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataTamu.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataTamu.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {/* Header section with custom style */}
<div
  className="card-header text-center"
  style={{
    backgroundColor: "#e63946",
    color: "white",
    padding: "1rem",  // Mengurangi padding untuk ukuran header yang lebih kecil
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    maxWidth: "1125px",  // Membatasi lebar header
    width: "100%",  // Pastikan header mengikuti ukuran layar
    margin: "0 auto",  // Membuat header tetap di tengah
  }}
>
  {/* Gambar Kiri */}
  <img
    src="../dist/img/logo.png"
    alt="Logo Kiri"
    style={{
      width: "60px",  // Memperkecil ukuran gambar
      height: "60px",
      marginRight: "10px", // Mengurangi jarak antara gambar dan teks
      marginLeft: "150px",  // Mengurangi jarak kiri
    }}
  />

  {/* Teks Judul dan Deskripsi */}
  <div style={{ textAlign: "center", flex: 1 }}>
    <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Data Kunjungan</h2>  {/* Mengurangi ukuran font judul */}
    <p style={{ fontSize: "0.9rem", margin: "0", color: "white" }}>  {/* Mengurangi ukuran font deskripsi */}
      Data Kunjungan Buku Tamu SMK NEGERI 1 PONOROGO
    </p>
  </div>

  {/* Gambar Kanan */}
  <img
    src="../dist/img/smk.png"
    alt="Logo Kanan"
    style={{
      width: "60px",  // Memperkecil ukuran gambar
      height: "60px",
      marginLeft: "10px",  // Mengurangi jarak antara gambar dan teks
      marginRight: "150px", // Mengurangi jarak kanan
    }}
  />
</div>
      <section className="content">
        <div className="container">
          <div className="row">
            <div className="col">
              <table className="table table-striped table-bordered mt-2">
                <thead>
                  <tr>  
                    <th>No</th>
                    <th>Nama</th>
                    <th>No. Hp</th>
                    <th>Jabatan</th>
                    <th>Unit Kerja</th>
                    <th>Tujuan</th>
                    <th>Yang Dituju</th>
                    <th>Keterangan</th>
                    <th>Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={index}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{item.nama_tamu}</td>
                        <td>{item.no_hp}</td>
                        <td>{item.jabatan}</td>
                        <td>{item.unit_kerja}</td>
                        <td>{item.tujuan}</td>
                        <td>{item.yang_dituju}</td>
                        <td>{item.keterangan}</td>
                        <td >
                          <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Hapus</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">Tidak ada data</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={handlePrevious}>
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                      <button onClick={() => paginate(index + 1)} className="page-link">
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={handleNext}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BukuTamu;
