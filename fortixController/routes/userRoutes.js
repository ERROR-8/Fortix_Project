const express = require(`express`);
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  updateUser,
  deleteUser,
} = require(`../controller/userController`);
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

module.exports = router;