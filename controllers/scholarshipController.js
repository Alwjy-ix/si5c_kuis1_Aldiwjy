const scholarshipModel = require("../models/scholarshipModel");

// GET /scholarships
function getAll(req, res, next) {
  try {
    const { jenjang } = req.query;

    if (jenjang) {
      const data = scholarshipModel.getScholarshipsByJenjang(jenjang);
      return res.json(data);
    }

    const data = scholarshipModel.getAllScholarships();

    res.json(data);
  } catch (error) {
    next(error);
  }
}

// GET /scholarships/:id
function getById(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const data = scholarshipModel.getScholarshipById(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Data beasiswa tidak ditemukan",
        data: null,
      });
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
}

// POST /scholarships
function create(req, res, next) {
  try {
    const {
      namaBeasiswa,
      penyelenggara,
      nominal,
      jenjang,
      batasPendaftaran,
    } = req.body;

    if (
      !namaBeasiswa ||
      !penyelenggara ||
      !nominal ||
      !jenjang ||
      !batasPendaftaran
    ) {
      return res.status(400).json({
        status: "error",
        message: "Semua data wajib diisi",
        data: null,
      });
    }

    const baru = scholarshipModel.createScholarship(req.body);

    res.status(201).json({
      status: "success",
      message: "Data beasiswa berhasil ditambahkan",
      data: baru,
    });
  } catch (error) {
    next(error);
  }
}

// PUT /scholarships/:id
function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const dataLama = scholarshipModel.getScholarshipById(id);

    if (!dataLama) {
      return res.status(404).json({
        status: "error",
        message: "Data beasiswa tidak ditemukan",
        data: null,
      });
    }

    const {
      namaBeasiswa,
      penyelenggara,
      nominal,
      jenjang,
      batasPendaftaran,
    } = req.body;

    if (
      !namaBeasiswa ||
      !penyelenggara ||
      !nominal ||
      !jenjang ||
      !batasPendaftaran
    ) {
      return res.status(400).json({
        status: "error",
        message: "Semua data wajib diisi",
        data: null,
      });
    }

    const data = scholarshipModel.updateScholarship(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Data beasiswa berhasil diperbarui",
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

// DELETE /scholarships/:id
function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const data = scholarshipModel.getScholarshipById(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Data beasiswa tidak ditemukan",
        data: null,
      });
    }

    scholarshipModel.deleteScholarship(id);

    res.status(200).json({
      status: "success",
      message: `Data beasiswa dengan id ${id} berhasil dihapus`,
      data: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};