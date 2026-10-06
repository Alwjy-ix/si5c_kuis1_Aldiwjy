require("dotenv").config();

const express = require("express");
const cors = require("cors");

const logger = require("./middlewares/logger");
const scholarshipRoutes = require("./routes/scholarshipRoutes");
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
    ],
  });
});

// Route scholarships
app.use("/scholarships", scholarshipRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Menjalankan server hanya saat bukan production
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;