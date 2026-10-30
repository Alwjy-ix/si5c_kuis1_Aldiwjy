const express = require("express");
const router = express.Router();

const organizerController = require("../controllers/organizerController");
const cekApiKey = require("../middlewares/cekApiKey");

// POST /organizers
router.post("/", cekApiKey, organizerController.create);

module.exports = router;