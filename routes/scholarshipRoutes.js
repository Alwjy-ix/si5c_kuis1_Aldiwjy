const express = require("express");
const router = express.Router();

const scholarshipController = require("../controllers/scholarshipController");
const cekApiKey = require("../middlewares/cekApiKey");

// GET /scholarships
router.get("/", scholarshipController.getAll);

// GET /scholarships/:id
router.get("/:id", scholarshipController.getById);

// POST /scholarships
router.post("/", cekApiKey, scholarshipController.create);

// PUT /scholarships/:id
router.put("/:id", cekApiKey, scholarshipController.update);

// DELETE /scholarships/:id
router.delete("/:id", cekApiKey, scholarshipController.remove);

module.exports = router;