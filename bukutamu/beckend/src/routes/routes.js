const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const BukuTamuController = require("../controllers/bukuController");
const authJWT = require("../middleware/authMiddleware");

router.get("/users", authJWT,userController.index);
router.post("/users",authJWT,userController.storeUser);
router.get("/users/:id", authJWT, userController.showUser);
router.put("/users/:id", authJWT, userController.updateUser);
router.delete("/users/:id",authJWT,userController.destroyUser);

router.get("/bukutamu", BukuTamuController.index);
router.post("/bukutamu", BukuTamuController.storeBukuTamu);
router.get("/bukutamu/:id", BukuTamuController.showBukuTamu);
router.put("/bukutamu/:id", BukuTamuController.updateBukuTamu);
router.delete("/bukutamu/:id", BukuTamuController.destroyBukuTamu);

router.post("/login", userController.login);
router.post("/logout", authJWT, userController.logout);;

module.exports = router