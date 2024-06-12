const db = require("../models");
const Pelaporan = db.reporttpa;
const upload = require("../config/multer-config");
const multer = require("multer");

exports.createPelaporan = async (req, res) => {
  upload.single("img_tpa")(req, res, async function (err) {
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
      jenis_lokasi,
      nama_lokasi,
      alamat,
      kota,
      kode_pos,
      provinsi,
      latitude,
      longitude,
    } = req.body;

    try {
      const newPelaporan = await Pelaporan.create({
        user_id,
        nama_pelapor,
        no_tlp,
        jenis_lokasi,
        nama_lokasi,
        alamat,
        kota,
        kode_pos,
        provinsi,
        latitude,
        longitude,
        img_tpa: req.file ? req.file.filename : null,
      });

      return res.status(201).json({
        status: "success",
        message: "Pelaporan created successfully",
        data: {
          nama_pelapor: newPelaporan.nama_pelapor,
          latitude: newPelaporan.latitude,
          longitude: newPelaporan.longitude,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Unable to create pelaporan",
        error: error.message,
      });
    }
  });
};

exports.getAllPelaporan = async (req, res) => {
  try {
    const pelaporans = await Pelaporan.findAll();

    return res.status(200).json({
      status: "success",
      message: "Data laporan retrieved successfully",
      data: pelaporans,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unable to retrieve data laporan",
      error: error.message,
    });
  }
};

exports.updatePelaporan = async (req, res) => {
  const { id } = req.params;
  const {
    user_id,
    nama_pelapor,
    no_tlp,
    jenis_lokasi,
    nama_lokasi,
    alamat,
    kota,
    kode_pos,
    provinsi,
    latitude,
    longitude,
  } = req.body;

  try {
    const pelaporan = await Pelaporan.findByPk(id);
    if (!pelaporan) {
      return res.status(404).json({
        status: "error",
        message: "Pelaporan not found",
      });
    }

    let img_tpa = pelaporan.img_tpa;
    if (req.file) {
      if (img_tpa) {
        const imgPath = path.join("public", "img", img_tpa);
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      }
      img_tpa = req.file.filename;
    }

    await pelaporan.update({
      user_id,
      nama_pelapor,
      no_tlp,
      jenis_lokasi,
      nama_lokasi,
      alamat,
      kota,
      kode_pos,
      provinsi,
      latitude,
      longitude,
      img_tpa,
    });

    return res.status(200).json({
      status: "success",
      message: "Pelaporan updated successfully",
      data: pelaporan,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unable to update pelaporan",
      error: error.message,
    });
  }
};

exports.deletePelaporan = async (req, res) => {
  const { id } = req.params;

  try {
    const pelaporan = await Pelaporan.findByPk(id);
    if (!pelaporan) {
      return res.status(404).json({
        status: "error",
        message: "Pelaporan not found",
      });
    }

    await pelaporan.destroy();

    return res.status(200).json({
      status: "success",
      message: "Pelaporan deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unable to delete pelaporan",
      error: error.message,
    });
  }
};

exports.updateStatusPelaporan = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["verify", "not verify"].includes(status)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid status value",
    });
  }

  try {
    const pelaporan = await Pelaporan.findByPk(id);
    if (!pelaporan) {
      return res.status(404).json({
        status: "error",
        message: "Pelaporan not found",
      });
    }

    await pelaporan.update({ status });

    return res.status(200).json({
      status: "success",
      message: "Pelaporan status updated successfully",
      data: pelaporan,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unable to update pelaporan status",
      error: error.message,
    });
  }
};

exports.getPelaporanById = async (req, res) => {
  const { id } = req.params;
  try {
    const pelaporan = await Pelaporan.findByPk(id);
    if (!pelaporan) {
      return res.status(404).json({
        status: "error",
        message: "Pelaporan not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Pelaporan retrieved successfully",
      data: pelaporan,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unable to retrieve pelaporan",
      error: error.message,
    });
  }
};
