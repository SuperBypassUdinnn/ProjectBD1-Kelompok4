// Helper error
function setError(id, message) {
  let el = document.getElementById(id + "_error");
  if (!el) {
    el = document.createElement("div");
    el.id = id + "_error";
    el.className = "input-error";
    document.getElementById(id).parentNode.appendChild(el);
  }
  el.textContent = message;
}
function clearError(id) {
  let el = document.getElementById(id + "_error");
  if (el) el.textContent = "";
}

// Prefill dan readonly
window.onload = async function () {
  const isFromRegister = window.location.search.includes("from=register");
  const isReadonly = window.location.search.includes("readonly=true");
  const profileData = JSON.parse(localStorage.getItem("profileData") || "{}");
  const id_pasien = profileData.id_pasien;

  // Prefill data jika ada
  if ((!isFromRegister && id_pasien) || isReadonly) {
    const res = await fetch(`http://localhost:3000/api/pasien/${id_pasien}`);
    if (res.ok) {
      const data = await res.json();
      document.getElementById("id_pasien").value = data.nik || "";
      document.getElementById("nama_pasien").value = data.nama_pasien || "";
      document.getElementById("email_pasien").value = data.email || "";
      document.getElementById("no_telp_pasien").value =
        data.no_telp_pasien || "";
      document.getElementById("alamat_pasien").value = data.alamat || "";
    }
  }

  // Mode readonly
  if (isReadonly) {
    document.querySelectorAll("input, textarea").forEach((el) => {
      el.setAttribute("readonly", true);
      el.setAttribute("disabled", true);
    });
    document.getElementById("popupButtons").innerHTML = `
      <button onclick="window.location.href='form.html'">Ubah Data Diri</button>
      <button onclick="window.location.href='mainmenu.html'">Kembali</button>
    `;
  } else {
    document.querySelectorAll("input, textarea").forEach((el) => {
      el.removeAttribute("readonly");
      el.removeAttribute("disabled");
    });
  }
};

function hasInputError() {
  // Cek jika ada elemen error yang tidak kosong
  return (
    document.getElementById("id_pasien_error")?.textContent ||
    document.getElementById("nama_pasien_error")?.textContent ||
    document.getElementById("email_pasien_error")?.textContent ||
    document.getElementById("no_telp_pasien_error")?.textContent
  );
}

// Simpan data
async function saveProfileData() {
  if (window.location.search.includes("readonly=true")) return;

  // Tambahkan pengecekan error di sini
  if (hasInputError()) {
    alert("Perbaiki data yang tidak valid sebelum menyimpan!");
    return;
  }

  const data = {
    nik: document.getElementById("id_pasien").value,
    nama_pasien: document.getElementById("nama_pasien").value,
    email: document.getElementById("email_pasien").value,
    no_telp_pasien: document.getElementById("no_telp_pasien").value,
    alamat: document.getElementById("alamat_pasien").value,
    id_akun: JSON.parse(localStorage.getItem("profileData"))?.id_akun || "",
  };

  // Validasi wajib isi
  if (
    !data.nik ||
    !data.nama_pasien ||
    !data.email ||
    !data.no_telp_pasien ||
    !data.alamat
  ) {
    alert("Mohon lengkapi semua data!");
    return;
  }

  try {
    const profileData = JSON.parse(localStorage.getItem("profileData") || "{}");
    const isEdit = !!profileData.id_pasien;
    let res, result;
    if (isEdit) {
      const id_pasien = profileData.id_pasien;
      res = await fetch(`http://localhost:3000/api/pasien/${id_pasien}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      res = await fetch("http://localhost:3000/api/pasien", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    result = await res.json();
    if (!res.ok) {
      alert(result.error || result.message || "Gagal menyimpan data diri");
      return;
    }
    const id_pasien_final = isEdit
      ? profileData.id_pasien
      : result.id_pasien || result.id || data.id_pasien;

    localStorage.setItem(
      "profileData",
      JSON.stringify({
        ...data,
        id_pasien: id_pasien_final,
        username: profileData.username || "",
        id_akun: profileData.id_akun || "",
      })
    );

    if (window.location.search.includes("from=register")) {
      window.location.href = "mainmenu.html";
    } else {
      window.location.href = "form.html?readonly=true";
    }
  } catch (err) {
    alert("Terjadi kesalahan koneksi ke server");
  }
}

// Validasi NIK: 16 digit angka
document.getElementById("id_pasien").addEventListener("input", function () {
  const val = this.value;
  if (!/^\d*$/.test(val)) {
    setError("id_pasien", "NIK hanya boleh berisi angka.");
  } else if (val.length < 16) {
    setError("id_pasien", "NIK harus 16 digit angka.");
  } else if (val.length > 16) {
    setError("id_pasien", "NIK tidak boleh lebih dari 16 digit.");
  } else {
    clearError("id_pasien");
  }
});

// Nama: hanya abjad dan spasi, kapitalisasi otomatis
document.getElementById("nama_pasien").addEventListener("input", function () {
  let val = this.value.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  this.value = val;
  if (!/^[a-zA-Z\s]*$/.test(val)) {
    setError("nama_pasien", "Nama hanya boleh berisi huruf dan spasi.");
  } else {
    clearError("nama_pasien");
  }
});

// Email: harus mengandung '@'
document.getElementById("email_pasien").addEventListener("input", function () {
  const val = this.value;
  if (val && !val.includes("@")) {
    setError("email_pasien", "Email harus mengandung simbol '@'.");
  } else {
    clearError("email_pasien");
  }
});

// No HP: hanya angka, maksimal 15 digit
document
  .getElementById("no_telp_pasien")
  .addEventListener("input", function () {
    let val = this.value.replace(/\D/g, "");
    this.value = val;
    if (val.length > 15) {
      setError(
        "no_telp_pasien",
        "Nomor telepon tidak boleh lebih dari 15 digit."
      );
    } else if (!/^\d*$/.test(val)) {
      setError("no_telp_pasien", "Nomor telepon hanya boleh berisi angka.");
    } else {
      clearError("no_telp_pasien");
    }
  });

// Fokus otomatis ke input berikutnya saat tekan Enter
const formInputs = [
  "id_pasien",
  "nama_pasien",
  "email_pasien",
  "no_telp_pasien",
  "alamat_pasien",
].map((id) => document.getElementById(id));

formInputs.forEach((input, idx) => {
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      // Jika bukan input terakhir, fokus ke berikutnya
      if (idx < formInputs.length - 1) {
        formInputs[idx + 1].focus();
      } else {
        // Jika input terakhir, trigger simpan
        saveProfileData();
      }
    }
  });
});
