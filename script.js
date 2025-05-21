// Fungsi untuk membuka popup
function openPopup(id) {
  document.body.style.overflow = "hidden"; // Mencegah scroll saat popup terbuka
  document.getElementById(id).classList.add("open");
}

// Fungsi untuk menutup popup
function closePopup(id) {
  document.body.style.overflow = ""; // Mengembalikan scroll
  document.getElementById(id).classList.remove("open");

  // Kosongkan input pada popup login
  if (id === "loginPopup") {
    document.getElementById("loginUser").value = "";
    document.getElementById("loginPass").value = "";
  }
  // Kosongkan input pada popup register
  if (id === "registerPopup") {
    document.getElementById("regUser").value = "";
    document.getElementById("regPass").value = "";
    document.getElementById("regPassConfirm").value = "";
  }
}

// Fungsi untuk validasi login
function handleLogin() {
  const username = document.getElementById('loginUser').value.trim();
  const password = document.getElementById('loginPass').value.trim();

  // Validasi sederhana
  if (!username || !password) {
    alert("Silakan isi username dan password");
    return;
  }

  // Contoh validasi statis (ganti dengan validasi sebenarnya)
  if (username === "admin" && password === "admin123") {
    // Jika sukses:
    window.location.href = "mainmenu.html";
  } else {
    alert("Username atau password salah");
  }
}

// Fungsi untuk validasi register
function handleRegister() {
  const email = document.getElementById("regUser").value.trim();
  const password = document.getElementById("regPass").value.trim();
  const passwordConfirm = document
    .getElementById("regPassConfirm")
    .value.trim();

  // Validasi sederhana
  if (!email || !password || !passwordConfirm) {
    alert("Silakan isi semua data");
    return;
  }

  if (password.length < 6) {
    alert("Password minimal 6 karakter");
    return;
  }

  if (password !== passwordConfirm) {
    alert("Konfirmasi password tidak cocok");
    return;
  }

  // Jika validasi berhasil
  alert("Registrasi berhasil! Silakan login");
  closePopup("registerPopup");
}

// Fungsi untuk toggle password visibility
// Update di script.js
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === "password";

  // Toggle tipe input
  input.type = isPassword ? "text" : "password";

  // Update ikon dan warna
  const icon = btn.querySelector("svg");
  if (!isPassword) {
    icon.innerHTML = `
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
    <line x1="1" y1="1" x2="23" y2="23"></line>
    `;
    btn.style.color = "#5D5A88";
  } else {
    icon.innerHTML = `
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
    `;
    btn.style.color = "#888";
  }
}

document.addEventListener("keydown", function (e) {
  // ESC untuk menutup popup
  if (e.key === "Escape") {
    if (document.getElementById("loginPopup").classList.contains("open")) {
      closePopup("loginPopup");
    }
    if (document.getElementById("registerPopup").classList.contains("open")) {
      closePopup("registerPopup");
    }
  }

  // ENTER untuk next/submit pada popup login
  if (e.key === "Enter") {
    if (document.getElementById("loginPopup").classList.contains("open")) {
      const user = document.getElementById("loginUser");
      const pass = document.getElementById("loginPass");
      if (document.activeElement === user) {
        pass.focus();
        e.preventDefault();
      } else if (document.activeElement === pass) {
        handleLogin();
        e.preventDefault();
      }
    }
    // ENTER untuk next/submit pada popup register
    if (document.getElementById("registerPopup").classList.contains("open")) {
      const user = document.getElementById("regUser");
      const pass = document.getElementById("regPass");
      const pass2 = document.getElementById("regPassConfirm");
      if (document.activeElement === user) {
        pass.focus();
        e.preventDefault();
      } else if (document.activeElement === pass) {
        pass2.focus();
        e.preventDefault();
      } else if (document.activeElement === pass2) {
        handleRegister();
        e.preventDefault();
      }
    }
  }
});

// Prevent close popup when clicking inside
document.querySelectorAll(".popupInner").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
  // Optional: lock scroll when sidebar open
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
  if (
    sidebar.classList.contains("open") &&
    !sidebar.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    toggleSidebar();
  }
});

// Tambahkan di script.js
function logout() {
  window.location.href = "index.html";
}

function submitBooking() {
  // Ambil data form
  const doctor = document.getElementById('doctor').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!doctor || !date || !time) {
    alert('Mohon lengkapi semua data reservasi.');
    return;
  }

  alert('Reservasi berhasil!\nDokter: ' + doctor + '\nTanggal: ' + date + '\nJam: ' + time);
  closePopup('bookingPopup');
}

// Cek dan tampilkan status data diri di sidebar
function updateSidebarProfile() {
  // Ambil data dari localStorage
  const id = localStorage.getItem('id_pasien');
  const nama = localStorage.getItem('nama_pasien');
  const email = localStorage.getItem('email_pasien');
  const telp = localStorage.getItem('no_telp_pasien');
  const alamat = localStorage.getItem('alamat_pasien');

  const exMark = document.getElementById('exclamationMark');
  const exMarkTop = document.getElementById('exclamationMarkTop');
  const sidebarNama = document.getElementById('sidebarNama');
  const sidebarDataDiri = document.getElementById('sidebarDataDiri');
  const sidebarId = document.getElementById('sidebarId');
  const sidebarEmail = document.getElementById('sidebarEmail');
  const sidebarTelp = document.getElementById('sidebarTelp');
  const sidebarAlamat = document.getElementById('sidebarAlamat');
  const editBtn = document.getElementById('editProfileBtn');

  // Jika ada salah satu data kosong, tampilkan tanda seru dan sembunyikan data
  if (!id || !nama || !email || !telp || !alamat) {
    if (exMark) exMark.style.display = "flex";
    if (exMarkTop) exMarkTop.style.display = "flex";
    if (sidebarNama) sidebarNama.textContent = "Nama Pengguna";
    if (sidebarDataDiri) sidebarDataDiri.style.display = "none";
    if (editBtn) editBtn.textContent = "Isi Data Diri";
  } else {
    if (exMark) exMark.style.display = "none";
    if (exMarkTop) exMarkTop.style.display = "none";
    if (sidebarNama) sidebarNama.textContent = nama;
    if (sidebarId) sidebarId.textContent = id;
    if (sidebarEmail) sidebarEmail.textContent = email;
    if (sidebarTelp) sidebarTelp.textContent = telp;
    if (sidebarAlamat) sidebarAlamat.textContent = alamat;
    if (sidebarDataDiri) sidebarDataDiri.style.display = "block";
    if (editBtn) editBtn.textContent = "Ubah Data Diri";
  }
}

// Simpan data diri dari popup ke localStorage dan update sidebar
function saveProfileData() {
  const id = document.getElementById('id_pasien').value.trim();
  const nama = document.getElementById('nama_pasien').value.trim();
  const email = document.getElementById('email_pasien').value.trim();
  const telp = document.getElementById('no_telp_pasien').value.trim();
  const alamat = document.getElementById('alamat_pasien').value.trim();

  if (!id || !nama || !email || !telp || !alamat) {
    alert('Mohon lengkapi semua data diri.');
    return;
  }

  localStorage.setItem('id_pasien', id);
  localStorage.setItem('nama_pasien', nama);
  localStorage.setItem('email_pasien', email);
  localStorage.setItem('no_telp_pasien', telp);
  localStorage.setItem('alamat_pasien', alamat);

  closePopup('profilePopup');
  updateSidebarProfile();
  alert('Data diri berhasil disimpan!');
}

// Fungsi untuk menghapus data diri
function deleteProfileData() {
  if (confirm('Apakah Anda yakin ingin menghapus data diri?')) {
    localStorage.removeItem('id_pasien');
    localStorage.removeItem('nama_pasien');
    localStorage.removeItem('email_pasien');
    localStorage.removeItem('no_telp_pasien');
    localStorage.removeItem('alamat_pasien');
    closePopup('profilePopup');
    updateSidebarProfile();
    alert('Data diri berhasil dihapus.');
  }
}

// Saat popup profile dibuka, isi field jika sudah ada data
function fillProfilePopup() {
  document.getElementById('id_pasien').value = localStorage.getItem('id_pasien') || '';
  document.getElementById('nama_pasien').value = localStorage.getItem('nama_pasien') || '';
  document.getElementById('email_pasien').value = localStorage.getItem('email_pasien') || '';
  document.getElementById('no_telp_pasien').value = localStorage.getItem('no_telp_pasien') || '';
  document.getElementById('alamat_pasien').value = localStorage.getItem('alamat_pasien') || '';
}

// Modifikasi openPopup khusus profilePopup
const originalOpenPopup = window.openPopup;
window.openPopup = function(id) {
  if (id === 'profilePopup') fillProfilePopup();
  if (typeof originalOpenPopup === 'function') {
    originalOpenPopup(id);
  }
};

// Panggil updateSidebarProfile saat halaman dimuat
document.addEventListener('DOMContentLoaded', updateSidebarProfile);
