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
  localStorage.removeItem("profileData");
  window.location.href = "index.html";
}

// Hapus profileData jika user benar-benar keluar dari web (opsional, jika ingin lebih ketat)
window.addEventListener("beforeunload", function () {
  // localStorage.removeItem("profileData");
  // Jika ingin tetap login di tab lain, baris di atas jangan diaktifkan
});

// Saat membuka sidebar, ambil data dari localStorage (atau bisa fetch dari backend jika ingin selalu fresh)
function updateSidebarProfile() {
  const data = JSON.parse(localStorage.getItem("profileData")) || {};
  const sidebarNama = document.getElementById("sidebarNama");
  const logoutBtn = document.querySelector(".logout-btn");
  const loginBtn = document.getElementById("sidebarLoginBtn");

  if (!data.username) {
    if (sidebarNama) sidebarNama.textContent = "Belum Login";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (!loginBtn) {
      const btn = document.createElement("button");
      btn.id = "sidebarLoginBtn";
      btn.className = "logout-btn";
      btn.textContent = "Login";
      btn.onclick = function () {
        closePopup && closePopup("profilePopup");
        openPopup && openPopup("loginPopup");
      };
      document.querySelector(".sidebar-content").appendChild(btn);
    }
  } else {
    if (sidebarNama) sidebarNama.textContent = data.username.toUpperCase();
    if (logoutBtn) logoutBtn.style.display = "";
    if (loginBtn) loginBtn.remove();
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
