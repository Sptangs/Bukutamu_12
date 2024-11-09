const koneksi = require('./db');
const bcrypt = require("bcryptjs");

const selectUsers = (callback) => {
    const q = "SELECT * FROM users";
    koneksi.query(q, callback);
};

const insertUsers = (nama, email, password, callback) => {
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const q = "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)";
        koneksi.query(q, [nama, email, hashedPassword], callback);
    } else {
        console.error("Password harus diisi");
    }
};

const selectUserById = (id, callback) => {
    const q = "SELECT * FROM users where id = ?";
    koneksi.query(q, [id], callback);
};

const selectUserByEmail = (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    koneksi.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error selecting user by email:", err.stack);
            return callback(err);
        }
        callback(null, results);
    });
};

const updateUser = (id, nama, email, password, callback) => {
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const q = "UPDATE users SET nama=?, email=?, password=? WHERE id=?";
        koneksi.query(q, [nama, email, hashedPassword, id], callback);
    } else {
        const q = "UPDATE users SET nama=?, email=? WHERE id=?";
        koneksi.query(q, [nama, email, id], callback);
    }
};


const deleteUser = (id, callback) => {
    const q = "DELETE FROM users where id =?";
    koneksi.query(q, [id], callback);
};

module.exports = { 
    selectUsers,
    insertUsers,
    selectUserById,
    updateUser,
    deleteUser,
    selectUserByEmail
};
