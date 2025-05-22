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

function updateSidebarProfile() {
  const nik = localStorage.getItem("nik_pasien");
  const nama = localStorage.getItem("nama_pasien");
  const email = localStorage.getItem("email_pasien");
  const telp = localStorage.getItem("no_telp_pasien");
  const alamat = localStorage.getItem("alamat_pasien");

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

function saveProfileData() {
  const nik = document.getElementById("nik_pasien").value.trim();
  const nama = document.getElementById("nama_pasien").value.trim();
  const email = document.getElementById("email_pasien").value.trim();
  const telp = document.getElementById("no_telp_pasien").value.trim();
  const alamat = document.getElementById("alamat_pasien").value.trim();

  if (!nik || !nama || !email || !telp || !alamat) {
    alert("Mohon lengkapi semua data diri.");
    return;
  }

  localStorage.setItem("nik_pasien", nik);
  localStorage.setItem("nama_pasien", nama);
  localStorage.setItem("email_pasien", email);
  localStorage.setItem("no_telp_pasien", telp);
  localStorage.setItem("alamat_pasien", alamat);

  closePopup("profilePopup");
  updateSidebarProfile();
  alert("Data diri berhasil disimpan!");
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
