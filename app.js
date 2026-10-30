
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const logger = require("./middlewares/logger");
const scholarshipRoutes = require("./routes/scholarshipRoutes");
const organizerRoutes = require("./routes/organizers");

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// Route utama
app.get("/", (req, res) => {
  res.json({
    namaMahasiswa: "Aldi Wijaya",
    nim: "2428240162",
    nomorTopik: 36,
    endpoints: [
      "GET /scholarships",
      "GET /scholarships/:id",
      "GET /scholarships?jenjang=S1",
      "POST /scholarships",
      "PUT /scholarships/:id",
      "DELETE /scholarships/:id",
      "POST /organizers",
    ],
  });
});

// Route scholarships
app.use("/scholarships", scholarshipRoutes);

// Route organizers
app.use("/organizers", organizerRoutes);

// Error handling (harus paling bawah)
app.use(notFound);
app.use(errorHandler);

// Koneksi MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("Terhubung ke MongoDB");

    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Gagal terhubung:", err.message);
    process.exit(1);
  });

module.exports = app;
