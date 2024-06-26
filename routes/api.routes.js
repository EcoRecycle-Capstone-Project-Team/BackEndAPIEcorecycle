const express = require("express");
const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");
const reportController = require("../controllers/laporsampah.controller");
const reporttpaController = require("../controllers/laporantpa.controller");
const dashboardController = require("../controllers/dashboard.controller");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API EcoRecycle 1.0",
  });
});

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get("/users", userController.getAllUsers);
router.get("/users/me", [authJwt.verifyToken], userController.getMe);
router.put(
  "/users/change-password",
  [authJwt.verifyToken],
  userController.changePassword
);
router.post("/users/forgot-password", userController.forgotPassword);
router.put(
  "/users/update-profile/:id",
  [authJwt.verifyToken],
  userController.updateUserProfile
);
router.delete("/users/:id", authJwt.verifyToken, userController.deleteUserById);

router.post("/report/newsampah", reportController.createReport);
router.get("/report/sampah", reportController.getAllReports);
router.put("/report/sampah/:id", reportController.updateReportById);
router.delete("/report/sampah/:id", reportController.deleteReportById);
router.patch("/report/sampah/:id/status", reportController.updateReportStatus);
router.get(
  "/report/sampah/:id",
  [authJwt.verifyToken],
  reportController.getReportById
);

router.get("/report/sampah/user/:id", reportController.getUserReports);
router.delete("/report/sampah/user/:id", reportController.deleteUserReportById);

router.get("/report/tpa", reporttpaController.getAllPelaporan);
router.post("/report/newtpa", reporttpaController.createPelaporan);
router.put("/report/tpa/:id", reporttpaController.updatePelaporan);
router.delete("/report/tpa/:id", reporttpaController.deletePelaporan);
router.patch(
  "/report/tpa/:id/status",
  reporttpaController.updateStatusPelaporan
);
router.get(
  "/report/tpa/:id",
  [authJwt.verifyToken],
  reporttpaController.getPelaporanById
);

router.get("/report/tpa/user/:id", reporttpaController.getPelaporanUser);
router.delete(
  "/report/tpa/user/:id",
  reporttpaController.deleteUserPelaporanById
);

router.get(
  "/total-reports",
  [authJwt.verifyToken, authJwt.isAdmin],
  dashboardController.getTotalReports
);
router.get(
  "/total-completed-reports",
  [authJwt.verifyToken, authJwt.isAdmin],
  dashboardController.getTotalCompletedReports
);
router.get(
  "/total-users",
  [authJwt.verifyToken, authJwt.isAdmin],
  dashboardController.getTotalUsers
);
router.get(
  "/dashboard-stats",
  [authJwt.verifyToken, authJwt.isAdmin],
  dashboardController.getDashboardStats
);

module.exports = router;
