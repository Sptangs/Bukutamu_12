const BukuTamu = require("../models/buku");

const index = (req, res) => {
    BukuTamu.selectBukuTamu((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) { 
            return res.status(404).json({
                message: "Buku tamu kosong"
            });
        }
        res.status(200).json(result);
    });
};

const storeBukuTamu = (req, res) => {
    const { nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan } = req.body;
    BukuTamu.insertBukuTamu(nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan, (err, result) => {
        if(err){
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Berhasil Disimpan", IdBuku: result.insertId });
    });
};

const showBukuTamu = (req, res) => {
    const { id } = req.params;
    BukuTamu.selectBukuTamuById(id, (err, result) => {
        if(err){
            return res.status(500).json({ error: err.message });
        }
        if(result.length === 0){
            return res.status(404).json({ message: "Buku tamu tidak ada" });
        }
        res.status(200).json(result[0]);
    });
};

const updateBukuTamu = (req, res) => {
    const { id } = req.params;
    const { nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan } = req.body;
    BukuTamu.updateBukuTamu(id, nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan, (err, result) => {
        if(err){
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Data berhasil dirubah");
    });
}; 

const destroyBukuTamu = (req, res) => {
    const { id } = req.params;
    
    BukuTamu.deleteBukuTamu(id, (err, result) => {
        if(err){
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Data berhasil dihapus");
    });
};

module.exports = { 
    index,
    storeBukuTamu,
    showBukuTamu,
    updateBukuTamu,
    destroyBukuTamu
};
