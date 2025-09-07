const express = require(`express`);
const router = express.Router();
const vctrl = require("../controller/vendorController");

router.get("/",vctrl.getVendor);
router.post("/",vctrl.createVendor);
router.put("/",vctrl.updateVendor);
router.delete("/",vctrl.deleteVendor);

module.exports = router;