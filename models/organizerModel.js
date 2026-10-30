
const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  namaOrganisasi: {
    type: String,
    required: true,
  },
  jenisOrganisasi: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
});

const Organizer = mongoose.model("Organizer", organizerSchema);

module.exports = Organizer;
