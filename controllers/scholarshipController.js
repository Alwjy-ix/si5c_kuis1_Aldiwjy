const Scholarship = require("../models/scholarshipModel");

// GET /scholarships
async function getAll(req, res, next) {
  try {
    const { jenjang, penyelenggara } = req.query;

    let filter = {};

    if (jenjang) {
      filter.jenjang = jenjang;
    }

    if (penyelenggara) {
      filter.penyelenggara = penyelenggara;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    const skip = (page - 1) * limit;

    const sort = {};

    if (req.query.sortBy) {
      sort[req.query.sortBy] = req.query.order === "desc" ? -1 : 1;
    }

    let projection = {};

    if (req.query.fields) {
      const fields = req.query.fields.split(",");

      fields.forEach((field) => {
        projection[field] = 1;
      });
    }

    const data = await Scholarship.find(filter, projection)
      .populate("organizer")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json(data);
  } catch (error) {
    next(error);
  }
}

// GET /scholarships/:id
async function getById(req, res, next) {
  try {
    const data = await Scholarship.findById(req.params.id).populate(
      "organizer",
    );

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
async function create(req, res, next) {
  try {
    const { namaBeasiswa, penyelenggara, nominal, jenjang, batasPendaftaran } =
      req.body;

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

    const baru = await Scholarship.create(req.body);
    await baru.populate("organizer");

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
async function update(req, res, next) {
  try {
    const { namaBeasiswa, penyelenggara, nominal, jenjang, batasPendaftaran } =
      req.body;

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

    const data = await Scholarship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("organizer");

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Data beasiswa tidak ditemukan",
        data: null,
      });
    }

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
async function remove(req, res, next) {
  try {
    const data = await Scholarship.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Data beasiswa tidak ditemukan",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Data beasiswa berhasil dihapus",
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
