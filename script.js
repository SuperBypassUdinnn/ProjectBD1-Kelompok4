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
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();

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
  const doctor = document.getElementById("doctor").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!doctor || !date || !time) {
    alert("Mohon lengkapi semua data reservasi.");
    return;
  }

  alert(
    "Reservasi berhasil!\nDokter: " +
      doctor +
      "\nTanggal: " +
      date +
      "\nJam: " +
      time
  );
  closePopup("bookingPopup");
}
