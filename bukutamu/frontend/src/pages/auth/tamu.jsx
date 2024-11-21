import React from "react";
import Swal from "sweetalert2";

const Tamu = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = {};
    const frmel = event.target;
    for (let el of frmel.elements) {
      fData[el.name] = el.value;
    }
    const response = await fetch("http://localhost:3000/api/bukutamu", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fData),
    });
    if (!response.ok) {
      console.log((error) => console.error);
    } else {
      Swal.fire("Ok! Data berhasil di simpan", {
        icon: "success",
        timer: "2000",
      });
      event.target.reset();
    }
  };

  return (
    <div className="container mt-5">
      <div className="register-box mx-auto" style={{ width: "100%" }}>
        <div className="card shadow-lg rounded-3">
          <div
            className="card-header text-center"
            style={{
              backgroundColor: "#e63946",
              color: "white",
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {/* Gambar Kiri */}
            <img
              src="../dist/img/logo.png"
              alt="Logo Kiri"
              style={{
                width: "80px",
                height: "80px",
                marginRight: "15px",
                marginLeft: "65px",
              }} // Gambar diperbesar
            />

            {/* Teks Judul dan Deskripsi */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <h2 style={{ margin: 0 }}>Booking Kunjungan SMKN 1 PONOROGO</h2>
              <p style={{ fontSize: "1rem", margin: "0", color: "white" }}>
                Silahkan isi form ini untuk melakukan booking kunjungan
              </p>
            </div>

            {/* Gambar Kanan */}
            <img
              src="../dist/img/smk.png"
              alt="Logo Kanan"
              style={{
                width: "80px",
                height: "80px",
                marginLeft: "15px",
                marginRight: "65px",
              }} // Gambar diperbesar dan tetap bulat
            />
          </div>

          <hr style={{ borderTop: "2px solid #e63946", margin: "0" }} />
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="nama_tamu">Nama Tamu</label>
                    <input
                      type="text"
                      name="nama_tamu"
                      className="form-control"
                      placeholder="Masukkan nama tamu"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="no_hp">Nomor HP</label>
                    <input
                      type="text"
                      name="no_hp"
                      className="form-control"
                      placeholder="Masukkan nomor HP"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="jabatan">Jabatan</label>
                    <input
                      type="text"
                      name="jabatan"
                      className="form-control"
                      placeholder="Masukkan jabatan"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="unit_kerja">Unit Kerja</label>
                    <input
                      type="text"
                      name="unit_kerja"
                      className="form-control"
                      placeholder="Masukkan unit kerja"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="tujuan">Tujuan</label>
                    <select
                      name="tujuan"
                      id="tujuan"
                      className="form-control"
                      required
                    >
                      <option value="">=== Pilih Unit Kerja Tujuan ===</option>
                      <option value="Kepala Sekolah">Kepala Sekolah</option>
                      <option value="Wakil Kepala Sekolah">
                        Wakil Kepala Sekolah
                      </option>
                      <option value="Akuntansi">Akuntansi</option>
                      <option value="Bisnis Digital">Bisnis Digital</option>
                      <option value="Desain Komunikasi Visual">
                        Desain Komunikasi Visual
                      </option>
                      <option value="Manajemen Perkantoran">
                        Manajemen Perkantoran
                      </option>
                      <option value="Rekayasa Perangkat Lunak">
                        Rekayasa Perangkat Lunak
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="yang_dituju">Nama Yang Dituju</label>
                    <input
                      type="text"
                      name="yang_dituju"
                      className="form-control"
                      placeholder="Masukkan nama yang dituju"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="keterangan">Keterangan</label>
                    <textarea
                      name="keterangan"
                      className="form-control"
                      placeholder="Masukkan keterangan"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              {/* Tombol di kanan bawah */}
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#e63946",
                    border: "none",
                    padding: "0.75rem 1.25rem",
                    fontSize: "1.1rem",
                    borderRadius: "5px",
                  }}
                >
                  <i className="fas fa-paper-plane me-2"></i> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tamu;
