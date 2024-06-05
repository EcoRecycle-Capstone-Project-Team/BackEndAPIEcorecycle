const db = require("../models");
const Report = db.reportsampah;
const upload = require("../config/multer-config");
const multer = require("multer");

exports.createReport = async (req, res) => {
  upload.single("img_bukti")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        status: "error",
        message: "Multer error occurred when uploading.",
        error: err.message,
      });
    } else if (err) {
      return res.status(500).json({
        status: "error",
        message: "An unknown error occurred when uploading.",
        error: err.message,
      });
    }

    const {
      user_id,
      nama_pelapor,
      no_tlp,
      alamat,
      kota,
      kode_pos,
      tgl_lapor,
      deskripsi,
      latitude,
      longitude,
    } = req.body;

    try {
      const newReport = await Report.create({
        user_id,
        nama_pelapor,
        no_tlp,
        alamat,
        kota,
        kode_pos,
        tgl_lapor,
        deskripsi,
        img_bukti: req.file ? req.file.filename : null,
        latitude,
        longitude,
      });

      return res.status(201).json({
        status: "success",
        message: "Report created successfully",
        data: newReport,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Unable to create report",
        error: error.message,
      });
    }
  });
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    return res.status(200).json({
      status: "success",
      message: "All reports retrieved successfully",
      data: reports,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unable to retrieve reports",
      error: error.message,
    });
  }
};

exports.updateReportById = async (req, res) => {
  const { id } = req.params;
  const {
    user_id,
    nama_pelapor,
    no_tlp,
    alamat,
    kota,
    kode_pos,
    tgl_lapor,
    deskripsi,
    latitude,
    longitude,
  } = req.body;

  try {
    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).json({
        status: "error",
        message: "Report not found",
      });
    }

    await report.update({
      user_id,
      nama_pelapor,
      no_tlp,
      alamat,
      kota,
      kode_pos,
      tgl_lapor,
      deskripsi,
      latitude,
      longitude,
    });

    return res.status(200).json({
      status: "success",
      message: "Report updated successfully",
      data: report,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unable to update report",
      error: error.message,
    });
  }
};

exports.deleteReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).json({
        status: "error",
        message: "Report not found",
      });
    }

    await report.destroy();
    return res.status(200).json({
      status: "success",
      message: "Report deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unable to delete report",
      error: error.message,
    });
  }
};

exports.updateReportStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "in_progress", "resolved"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid status value",
    });
  }

  try {
    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).json({
        status: "error",
        message: "Report not found",
      });
    }

    await report.update({ status });

    return res.status(200).json({
      status: "success",
      message: "Report status updated successfully",
      data: report,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unable to update report status",
      error: error.message,
    });
  }
};
