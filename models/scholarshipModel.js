// Data sementara
const scholarships = [
  {
    id: 1,
    namaBeasiswa: "Beasiswa Prestasi Digital",
    penyelenggara: "Yayasan Cendekia",
    nominal: 6000000,
    jenjang: "S1",
    batasPendaftaran: "2026-12-15",
  },
  {
    id: 2,
    namaBeasiswa: "Beasiswa Unggul Indonesia",
    penyelenggara: "Kementerian Pendidikan",
    nominal: 8000000,
    jenjang: "S1",
    batasPendaftaran: "2026-11-30",
  },
  {
    id: 3,
    namaBeasiswa: "Beasiswa Pendidikan Lanjutan",
    penyelenggara: "Universitas Nusantara",
    nominal: 5000000,
    jenjang: "S2",
    batasPendaftaran: "2027-01-20",
  },
];

let nextId = 4;

// Mengambil semua data beasiswa
function getAllScholarships() {
  return scholarships;
}

// Mengambil data berdasarkan id
function getScholarshipById(id) {
  return scholarships.find((item) => item.id === id);
}

// Mengambil data berdasarkan jenjang
function getScholarshipsByJenjang(jenjang) {
  return scholarships.filter((item) => item.jenjang === jenjang);
}

// Menambahkan data beasiswa
function createScholarship(data) {
  const baru = {
    id: nextId,
    namaBeasiswa: data.namaBeasiswa,
    penyelenggara: data.penyelenggara,
    nominal: data.nominal,
    jenjang: data.jenjang,
    batasPendaftaran: data.batasPendaftaran,
  };

  scholarships.push(baru);
  nextId++;

  return baru;
}

// Mengubah data beasiswa
function updateScholarship(id, data) {
  const index = scholarships.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  scholarships[index] = {
    id: id,
    namaBeasiswa: data.namaBeasiswa,
    penyelenggara: data.penyelenggara,
    nominal: data.nominal,
    jenjang: data.jenjang,
    batasPendaftaran: data.batasPendaftaran,
  };

  return scholarships[index];
}

// Menghapus data beasiswa
function deleteScholarship(id) {
  const index = scholarships.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  scholarships.splice(index, 1);

  return true;
}

module.exports = {
  getAllScholarships,
  getScholarshipById,
  getScholarshipsByJenjang,
  createScholarship,
  updateScholarship,
  deleteScholarship,
};