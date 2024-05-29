const db = require("../models");
const Report = db.reportsampah;

exports.createReport = async (req, res) => {
  const {
    user_id,
    nama_pelapor,
    no_tlp,
    alamat,
    kota,
    kode_pos,
    tgl_lapor,
    deskripsi,
    img_bukti,
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
      img_bukti,
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
};
