function toggleSidebar() {
  const profilePopup = document.getElementById("profilePopup");
  // Jika popup profile sedang terbuka, jangan tutup/dibuka sidebar
  if (profilePopup && profilePopup.classList.contains("open")) {
    return;
  }
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
  if (sidebar.classList.contains("open")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

// Optional: close sidebar when clicking outside
document.addEventListener("click", function (e) {
  const sidebar = document.getElementById("sidebar");
  const btn = document.querySelector(".account-btn");
  const profilePopup = document.getElementById("profilePopup");
  // Jangan tutup sidebar jika popup profile masih terbuka
  if (
    sidebar &&
    sidebar.classList.contains("open") &&
    !sidebar.contains(e.target) &&
    !btn.contains(e.target) &&
    !(profilePopup && profilePopup.classList.contains("open"))
  ) {
    toggleSidebar();
  }
});

function logout() {
  window.location.href = "index.html";
}

// Saat membuka sidebar, ambil data dari localStorage (atau bisa fetch dari backend jika ingin selalu fresh)
function updateSidebarProfile() {
  const data = JSON.parse(localStorage.getItem("profileData")) || {};
  const nik = data.nik || "";
  const nama = data.nama || "";
  const email = data.email || "";
  const telp = data.telp || "";
  const alamat = data.alamat || "";

  const exMark = document.getElementById("exclamationMark");
  const exMarkTop = document.getElementById("exclamationMarkTop");
  const sidebarNama = document.getElementById("sidebarNama");
  const sidebarDataDiri = document.getElementById("sidebarDataDiri");
  const sidebarId = document.getElementById("sidebarId");
  const sidebarEmail = document.getElementById("sidebarEmail");
  const sidebarTelp = document.getElementById("sidebarTelp");
  const sidebarAlamat = document.getElementById("sidebarAlamat");
  const editBtn = document.getElementById("editProfileBtn");

  if (!nik || !nama || !email || !telp || !alamat) {
    if (exMark) exMark.style.display = "flex";
    if (exMarkTop) exMarkTop.style.display = "flex";
    if (sidebarNama) sidebarNama.textContent = "Nama Pengguna";
    if (sidebarDataDiri) sidebarDataDiri.style.display = "none";
    if (editBtn) editBtn.textContent = "Isi Data Diri";
  } else {
    if (exMark) exMark.style.display = "none";
    if (exMarkTop) exMarkTop.style.display = "none";
    if (sidebarNama) sidebarNama.textContent = nama;
    if (sidebarId) sidebarId.textContent = nik;
    if (sidebarEmail) sidebarEmail.textContent = email;
    if (sidebarTelp) sidebarTelp.textContent = telp;
    if (sidebarAlamat) sidebarAlamat.textContent = alamat;
    if (sidebarDataDiri) sidebarDataDiri.style.display = "block";
    if (editBtn) editBtn.textContent = "Ubah Data Diri";
  }
}

function fillProfilePopup() {
  document.getElementById("nik_pasien").value =
    localStorage.getItem("nik_pasien") || "";
  document.getElementById("nama_pasien").value =
    localStorage.getItem("nama_pasien") || "";
  document.getElementById("email_pasien").value =
    localStorage.getItem("email_pasien") || "";
  document.getElementById("no_telp_pasien").value =
    localStorage.getItem("no_telp_pasien") || "";
  document.getElementById("alamat_pasien").value =
    localStorage.getItem("alamat_pasien") || "";
}

document.addEventListener("DOMContentLoaded", updateSidebarProfile);
