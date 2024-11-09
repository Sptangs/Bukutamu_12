const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const index = (req, res) => {
    User.selectUsers((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) { 
            return res.status(404).json({
                message: "user kosong"
            });
        }
        res.status(200).json(result);
    });
};

const storeUser = (req, res) => {
    const {nama, email, password} = req.body;
    User.insertUsers(nama, email, password, (err, result) => {
        if(err){
            return res.status(500).json({ error: err.message });
        }
        res
            .status(201)
            .json({message: "Berhasil Disimpan", userId: result.insertId});
    });
};

const showUser = (req, res) => {
    const {id} = req.params;
    User.selectUserById(id, (err, result) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(result.length === 0){
            return res.status(400).json({message: "USer Tidak Ada"});
        }
        res.status(200).json(result[0]);
    });
};

const updateUser = (req, res) => {
    const {id} = req.params;
    const {nama, email, password} = req.body;
    User.updateUser(id,nama,email,password, (err, result) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.status(200).json("data berhasil dirubah");
    });
}; 

const destroyUser = (req, res) => {
    const {id} = req.params;
    User.deleteUser(id, (err, result) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.status(200).json("data berhasil dihapus");
    });
};

const login = (req, res) => {
    const {email, password} = req.body;
    User.selectUserByEmail(email, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        if (results.length === 0) {
            return res.status(404).json({message: "User not found"});
        }
        
        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Incorrect password"});
        }
        
        const token = jwt.sign({id: user.id}, "ayosekolah", {
            expiresIn: 86400,
        });
        return res.status(200).json({auth: true, token});
    });
};

const logout = (req, res)=>{
    res.cookie('token', '', {expires: new Date(0)});
    res.status(200).json({auth:false, token:null})
};

module.exports = { 
    index,
    storeUser,
    showUser,
    updateUser,
    destroyUser,
    login,
    logout
};
