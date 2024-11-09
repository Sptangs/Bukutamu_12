const mysql = require("mysql2");
const konekMysql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
});

const createUserTable = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama varchar(100),
    email varchar(100) UNIQUE,
    password varchar(100)
    )`;
    koneksi.query(q, (err, result) => {
        if(err){
            console.error("error buat table user", err.stack);
            return;
        }
        console.log("table user berhasil di buat");
    });
}; 

const createBukuTamu = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS bukutamu(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama_tamu varchar(60),
        no_hp varchar(16),
        jabatan varchar(60),
        unit_kerja varchar(60),
        tujuan varchar(100),
        yang_dituju varchar(100),
        keterangan varchar(100),
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL
    )`;
    koneksi.query(q, (err, result) => {
        if(err){
            console.error("error buat table buku", err.stack);
            return;
        }
        console.log("table buku berhasil di buat");
    })
}

const migration = () => {
    konekMysql.connect((err) => {
        if(err){
            console.error("Error koneksi ke database", err.stack);
            return;
        }
        console.log("berhasil konek mysql");
        konekMysql.query(
            "CREATE DATABASE IF NOT EXISTS bukutamu",
            (err, result) => {
                if(err){
                    console.error("Error membuat database", err.stack);
                    return;
                }
                console.log("Database berhasil dibuat atau sudah ada.");

                const koneksi = require("./db");
                createUserTable(koneksi);
                createBukuTamu(koneksi);
                konekMysql.end();
            }
        )
    })
}

module.exports = migration;