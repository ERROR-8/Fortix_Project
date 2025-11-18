const express = require(`express`);
const router = express.Router();
const uctrl = require(`../controller/userController`);

router.post("/register",uctrl.registerUser);
router.post("/login",uctrl.loginUser);
router.get("/",uctrl.getuser);
router.put("/:id",uctrl.updateUser);
router.delete("/:id",uctrl.deleteUser);

module.exports = router;