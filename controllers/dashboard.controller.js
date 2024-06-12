const db = require("../models");
const User = db.user;
const ReportSampah = db.reportsampah;
const ReportTpa = db.reporttpa;

exports.getTotalReports = async (req, res) => {
  try {
    const totalReports = await ReportSampah.count();
    const totalTpaReports = await ReportTpa.count();

    res.status(200).json({
      status: "success",
      message: "Total reports retrieved successfully",
      data: {
        totalReports,
        totalTpaReports,
        total: totalReports + totalTpaReports,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to fetch total reports",
      error: error.message,
    });
  }
};

exports.getTotalCompletedReports = async (req, res) => {
  try {
    const totalCompletedReports = await ReportSampah.count({
      where: { status: "resolved" },
    });
    const totalCompletedTpaReports = await ReportTpa.count({
      where: { status: "verify" },
    });

    res.status(200).json({
      status: "success",
      message: "Total completed reports retrieved successfully",
      data: {
        totalCompletedReports,
        totalCompletedTpaReports,
        totalCompleted: totalCompletedReports + totalCompletedTpaReports,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to fetch total completed reports",
      error: error.message,
    });
  }
};

exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.count();

    res.status(200).json({
      status: "success",
      message: "Total users retrieved successfully",
      data: {
        totalUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to fetch total users",
      error: error.message,
    });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalReports = await ReportSampah.count();
    const totalTpaReports = await ReportTpa.count();
    const totalCompletedReports = await ReportSampah.count({
      where: { status: "resolved" },
    });
    const totalCompletedTpaReports = await ReportTpa.count({
      where: { status: "verify" },
    });
    const totalUsers = await User.count();

    res.status(200).json({
      status: "success",
      message: "Dashboard statistics retrieved successfully",
      data: {
        totalReports,
        totalTpaReports,
        totalCompletedReports,
        totalCompletedTpaReports,
        totalUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to fetch dashboard statistics",
      error: error.message,
    });
  }
};
