function handleLogin() {
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();

  if (!username || !password) {
    alert("Silakan isi username dan password");
    return;
  }

  if (username === "admin" && password === "admin123") {
    window.location.href = "mainmenu.html";
  } else {
    alert("Username atau password salah");
  }
}

function handleRegister() {
  const email = document.getElementById("regUser").value.trim();
  const password = document.getElementById("regPass").value.trim();
  const passwordConfirm = document
    .getElementById("regPassConfirm")
    .value.trim();

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

  alert("Registrasi berhasil! Silakan isi data diri Anda");
  closePopup("registerPopup");
  window.location.href = "form.html";
}
