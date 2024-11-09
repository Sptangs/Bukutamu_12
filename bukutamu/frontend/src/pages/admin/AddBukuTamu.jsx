import React, { useState } from "react";
import Swal from "sweetalert2";

const AddBukuTamu = ({ onAddSuccess }) => {
  const [formData, setFormData] = useState({
    nama_tamu: "",
    no_hp: "",
    jabatan: "",
    unit_kerja: "",
    tujuan: "",
    yang_dituju: "",
    keterangan: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/bukutamu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add entry");

      const data = await response.json();
      Swal.fire("Success", "Guest entry added successfully!", "success");
      setFormData({
        nama_tamu: "",
        no_hp: "",
        jabatan: "",
        unit_kerja: "",
        tujuan: "",
        yang_dituju: "",
        keterangan: "",
      });

      if (onAddSuccess) onAddSuccess(data);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Guest Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Nama Tamu</label>
            <input
              type="text"
              name="nama_tamu"
              value={formData.nama_tamu}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Nama Tamu"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">No. HP</label>
            <input
              type="text"
              name="no_hp"
              value={formData.no_hp}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="No HP"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Jabatan</label>
            <input
              type="text"
              name="jabatan"
              value={formData.jabatan}
              onChange={handleChange}
              className="form-control"
              placeholder="Jabatan"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Unit Kerja</label>
            <input
              type="text"
              name="unit_kerja"
              value={formData.unit_kerja}
              onChange={handleChange}
              className="form-control"
              placeholder="Unit Kerja"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Tujuan</label>
            <input
              type="text"
              name="tujuan"
              value={formData.tujuan}
              onChange={handleChange}
              className="form-control"
              placeholder="Tujuan"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Yang Dituju</label>
            <input
              type="text"
              name="yang_dituju"
              value={formData.yang_dituju}
              onChange={handleChange}
              className="form-control"
              placeholder="Yang Dituju"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Keterangan</label>
          <textarea
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            className="form-control"
            placeholder="Keterangan"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default AddBukuTamu;
