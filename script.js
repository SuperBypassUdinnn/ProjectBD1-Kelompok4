// Fungsi untuk membuka popup
function openPopup(id) {
  document.body.style.overflow = 'hidden'; // Mencegah scroll saat popup terbuka
  document.getElementById(id).classList.add("open");
}

// Fungsi untuk menutup popup
function closePopup(id) {
  document.body.style.overflow = ''; // Mengembalikan scroll
  document.getElementById(id).classList.remove("open");
}

// Fungsi untuk validasi login
function handleLogin() {
  const email = document.getElementById('loginUser').value.trim();
  const password = document.getElementById('loginPass').value.trim();
  
  // Validasi sederhana
  if (!email || !password) {
    alert("Silakan isi email dan password");
    return;
  }
  
  // Contoh validasi statis (ganti dengan validasi sebenarnya)
  if (email === "admin@example.com" && password === "admin123") {
    // Jika sukses:
    window.location.href = "dashboard.html";
  } else {
    alert("Email atau password salah");
  }
}

// Fungsi untuk validasi register
function handleRegister() {
  const email = document.getElementById('regUser').value.trim();
  const password = document.getElementById('regPass').value.trim();
  
  // Validasi sederhana
  if (!email || !password) {
    alert("Silakan isi semua data");
    return;
  }
  
  if (password.length < 6) {
    alert("Password minimal 6 karakter");
    return;
  }
  
  // Jika validasi berhasil
  alert("Registrasi berhasil! Silakan login");
  closePopup('registerPopup');
}

// Fungsi untuk toggle password visibility
// Update di script.js
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === "password";
  
  // Toggle tipe input
  input.type = isPassword ? "text" : "password";
  
  // Update ikon dan warna
  const icon = btn.querySelector('svg');
  if (!isPassword) {
    icon.innerHTML = `
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
    <line x1="1" y1="1" x2="23" y2="23"></line>
    `;
    btn.style.color = '#5D5A88';
  } else {
    icon.innerHTML = `
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
    `;
    btn.style.color = '#888';
  }
}

// Tutup popup ketika klik di luar area popup
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('popup')) {
    const popupId = e.target.id;
    closePopup(popupId);
  }
});

// Prevent close popup when clicking inside
document.querySelectorAll('.popupInner').forEach(el => {
  el.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
  // Optional: lock scroll when sidebar open
  if (sidebar.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Optional: close sidebar when clicking outside
document.addEventListener('click', function(e) {
  const sidebar = document.getElementById('sidebar');
  const btn = document.querySelector('.account-btn');
  if (
    sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    toggleSidebar();
  }
});