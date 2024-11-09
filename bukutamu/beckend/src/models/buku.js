const koneksi = require("./db");

const selectBukuTamu = (callback) => {
    const q = "SELECT id,nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan FROM bukutamu WHERE deleted_at IS NULL";
    koneksi.query(q, callback);
};


const insertBukuTamu = (nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan, callback) => {
    const q = "INSERT INTO bukutamu(nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan) VALUES(?,?,?,?,?,?,?) ";
    koneksi.query(q, [nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan], callback);
};

const updateBukuTamu = (id, nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan, callback) => {
    const q = "UPDATE bukutamu SET nama_tamu = ?, no_hp = ?, jabatan = ?, unit_kerja = ?, tujuan = ?, yang_dituju = ?, keterangan = ? WHERE id = ?";
    koneksi.query(q, [nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan, id], callback);
};

const selectBukuTamuById = (id, callback) => {
    const q = "SELECT * FROM bukutamu where id = ? AND deleted_at IS NULL";
    koneksi.query(q, [id], callback);
};

const deleteBukuTamu = (id, callback) => {
    const q = "UPDATE bukutamu SET deleted_at = NOW() WHERE id = ?";
    koneksi.query(q, [id], callback);
};


module.exports = {
    selectBukuTamu,
    insertBukuTamu,
    updateBukuTamu,
    selectBukuTamuById,
    deleteBukuTamu
};