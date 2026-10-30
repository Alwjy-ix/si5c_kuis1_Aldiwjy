
const mongoose = require("mongoose");

// Schema Beasiswa
const scholarshipSchema = new mongoose.Schema({
  namaBeasiswa: {
    type: String,
    required: true,
  },
  penyelenggara: {
    type: String,
    required: true,
  },
  nominal: {
    type: Number,
    required: true,
  },
  jenjang: {
    type: String,
    required: true,
  },
  batasPendaftaran: {
    type: Date,
    required: true,
  },

  // EMBEDDING
  persyaratan: {
    type: [String],
    default: [],
  },

  // REFERENCING
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizer",
    required: true,
  },
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

module.exports = Scholarship;
