
const Organizer = require("../models/organizerModel");

// POST /organizers
async function create(req, res, next) {
  try {
    const { namaOrganisasi, jenisOrganisasi, alamat } = req.body;

    if (!namaOrganisasi || !jenisOrganisasi || !alamat) {
      return res.status(400).json({
        status: "error",
        message: "Semua data wajib diisi",
        data: null,
      });
    }

    const baru = await Organizer.create({
      namaOrganisasi,
      jenisOrganisasi,
      alamat,
    });

    res.status(201).json({
      status: "success",
      message: "Data penyelenggara berhasil ditambahkan",
      data: baru,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
};
