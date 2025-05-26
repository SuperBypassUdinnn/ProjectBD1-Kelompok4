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

// async function saveProfileData() {
//   const nik = document.getElementById("nik_pasien").value.trim();
//   const nama = document.getElementById("nama_pasien").value.trim();
//   const email = document.getElementById("email_pasien").value.trim();
//   const telp = document.getElementById("no_telp_pasien").value.trim();
//   const alamat = document.getElementById("alamat_pasien").value.trim();

//   if (!nik || !nama || !email || !telp || !alamat) {
//     alert("Mohon lengkapi semua data diri.");
//     return;
//   }

//   // Ambil username dan id_akun dari localStorage (hasil login/register)
//   const profile = JSON.parse(localStorage.getItem("profileData")) || {};
//   const username = profile.username || "";
//   const id_akun = profile.id_akun || "";

//   // Kirim ke backend
//   try {
//     const res = await fetch("http://localhost:3000/api/pasien", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         nik,
//         nama_pasien: nama,
//         email,
//         no_telp_pasien: telp,
//         alamat,
//         username,
//         id_akun,
//       }),
//     });
//     const result = await res.json();
//     if (!res.ok) {
//       alert(result.error || result.message || "Gagal menyimpan data diri");
//       return;
//     }

//     // Simpan ke localStorage hanya untuk kebutuhan tampilan sidebar
//     localStorage.setItem(
//       "profileData",
//       JSON.stringify({
//         ...profile,
//         id_pasien: result.id_pasien,
//         nama,
//         nik,
//         email,
//         telp,
//         alamat,
//       })
//     );

//     closePopup("profilePopup");
//     updateSidebarProfile();
//     alert("Data diri berhasil disimpan!");
//   } catch (err) {
//     alert("Terjadi kesalahan koneksi ke server");
//   }
// }

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
