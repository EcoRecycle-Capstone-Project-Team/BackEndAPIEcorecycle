const express = require("express");
const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");
const reportController = require("../controllers/laporsampah.controller");
const reporttpaController = require("../controllers/laporantpa.controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Apps In Ready Guys");
});

router.get("/users", userController.getAllUsers);
router.get("/users/me", [authJwt.verifyToken], userController.getMe);
router.put(
  "/users/change-password",
  [authJwt.verifyToken],
  userController.changePassword
);
router.post("/users/forgot-password", userController.forgotPassword);

router.post("/report/sampah", reportController.createReport);
router.post("/report/tpa", reporttpaController.createPelaporan);

module.exports = router;
