import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BukuTamu = () => {
  const [dataTamu, setTamu] = useState([]);
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
          .then(res => {
            window.location.reload();
          });
      }
    });
  }

  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2"> 
            <div className="col">
              <h1 className="m-0">Data User</h1>
            </div>
            <div className="col">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Input User</li>
              </ol>
            </div>
          </div>
        </div>
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
                  {dataTamu.length > 0 ? (
                    dataTamu.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nama_tamu}</td>
                        <td>{item.no_hp}</td>
                        <td>{item.jabatan}</td>
                        <td>{item.unit_kerja}</td>
                        <td>{item.tujuan}</td>
                        <td>{item.yang_dituju}</td>
                        <td>{item.keterangan}{item.id}</td>
                        <td>
                          <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Hapus</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">No data available</td>
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
}

export default BukuTamu;
