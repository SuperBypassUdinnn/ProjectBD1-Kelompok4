async function handleLogin() {
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();

  if (!username || !password) {
    alert("Silakan isi username dan password");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/akun/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    // Pastikan backend mengirim data.user.id_akun
    const id_akun = data.user?.id_akun || data.id_akun;
    if (res.ok && id_akun) {
      // Ambil data pasien berdasarkan id_akun
      const pasienRes = await fetch(
        `http://localhost:3000/api/pasien/akun/${id_akun}`
      );
      const pasienData = pasienRes.ok ? await pasienRes.json() : null;

      if (pasienData && pasienData.id_pasien) {
        // Gabungkan data pasien dan username akun
        localStorage.setItem(
          "profileData",
          JSON.stringify({
            ...pasienData,
            username: username,
          })
        );
        alert("Login berhasil!");
        localStorage.removeItem("id_pasien");
        window.location.href = "mainmenu.html";
      } else {
        alert("Data pasien tidak ditemukan. Silakan lengkapi data diri Anda.");
        // Redirect ke form data diri jika perlu
        // window.location.href = "form.html";
      }
    } else {
      alert(data.message || "Login gagal");
    }
  } catch (err) {
    alert("Terjadi kesalahan koneksi ke server");
  }
}

async function handleRegister() {
  const username = document.getElementById("regUser").value.trim();
  const password = document.getElementById("regPass").value.trim();
  const passwordConfirm = document
    .getElementById("regPassConfirm")
    .value.trim();

  if (!username || !password || !passwordConfirm) {
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

  try {
    const res = await fetch("http://localhost:3000/api/akun/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem(
        "profileData",
        JSON.stringify({ username, id_akun: data.id_akun })
      );
      localStorage.removeItem("id_pasien");
      window.location.href = "form.html?from=register";
    } else {
      alert(data.message || "Registrasi gagal");
    }
  } catch (err) {
    alert("Terjadi kesalahan koneksi ke server");
  }
}
