const db = require("../models");
const Pelaporan = db.reporttpa;

exports.createPelaporan = async (req, res) => {
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
};
