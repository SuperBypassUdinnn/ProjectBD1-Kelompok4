async function submitBooking() {
  const spesialis = document.getElementById("spesialis").value;
  const dokter = document.getElementById("dokter").value;
  const hari = document.getElementById("hari").value;
  const jadwal = document.getElementById("jadwal").value;
  const keluhan = document.getElementById("keluhan").value.trim();

  const profileData = JSON.parse(localStorage.getItem("profileData") || "{}");
  const id_pasien = profileData.id_pasien;

  if (!spesialis || !dokter || !hari || !jadwal) {
    alert("Mohon lengkapi semua data reservasi.");
    return;
  }
  if (!id_pasien) {
    alert("Data pasien tidak ditemukan. Silakan login ulang.");
    return;
  }

  try {
    // Ambil id_jadwal_dokter dari backend
    const resJadwalDokter = await fetch(
      `http://localhost:3000/api/jadwal-dokter/jadwal-dokter?id_jadwal=${jadwal}&id_dokter=${dokter}`
    );
    const dataJadwalDokter = await resJadwalDokter.json();
    const id_jadwal_dokter =
      Array.isArray(dataJadwalDokter) && dataJadwalDokter.length > 0
        ? dataJadwalDokter[0].id_jadwal_dokter
        : null;

    if (!id_jadwal_dokter) {
      alert("Jadwal dokter tidak ditemukan.");
      return;
    }

    const res = await fetch("http://localhost:3000/api/reservasi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_pasien,
        id_jadwal_dokter,
        keluhan,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Reservasi berhasil!");
      closePopup("bookingPopup");
      // Jika ingin refresh daftar reservasi, panggil loadReservasi() di sini
    } else {
      alert(data.message || data.error || "Reservasi gagal.");
    }
  } catch (err) {
    alert("Terjadi kesalahan koneksi ke server.");
  }
}

async function loadSpesialis() {
  const res = await fetch("http://localhost:3000/api/spesialis");
  const data = await res.json();
  const select = document.getElementById("spesialis");
  select.innerHTML = '<option value="">-- Pilih Poli --</option>';
  data.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s.id_spesialis;
    opt.textContent = s.ruang;
    select.appendChild(opt);
  });
}

async function loadDokter() {
  const id_spesialis = document.getElementById("spesialis").value;
  const dokterSelect = document.getElementById("dokter");
  dokterSelect.innerHTML = '<option value="">-- Pilih Dokter --</option>';
  if (!id_spesialis) return;
  const res = await fetch(
    `http://localhost:3000/api/dokter/spesialis/${id_spesialis}`
  );
  const data = await res.json();
  data.forEach((d) => {
    const opt = document.createElement("option");
    opt.value = d.id_dokter;
    opt.textContent = d.nama_dokter;
    dokterSelect.appendChild(opt);
  });
}

async function loadHari() {
  const id_dokter = document.getElementById("dokter").value;
  const hariSelect = document.getElementById("hari");
  hariSelect.innerHTML = '<option value="">-- Pilih Hari --</option>';
  document.getElementById("jadwal").innerHTML =
    '<option value="">-- Pilih Jadwal --</option>';
  if (!id_dokter) return;
  const res = await fetch(
    `http://localhost:3000/api/jadwal-dokter/hari?id_dokter=${id_dokter}`
  );
  const data = await res.json();
  data.forEach((h) => {
    const opt = document.createElement("option");
    opt.value = h.hari;
    opt.textContent = h.hari;
    hariSelect.appendChild(opt);
  });
}

async function loadJadwal() {
  const id_dokter = document.getElementById("dokter").value;
  const hari = document.getElementById("hari").value;
  const jadwalSelect = document.getElementById("jadwal");
  jadwalSelect.innerHTML = '<option value="">-- Pilih Jadwal --</option>';
  if (!id_dokter || !hari) return;
  const res = await fetch(
    `http://localhost:3000/api/jadwal-dokter/jadwal?id_dokter=${id_dokter}&hari=${hari}`
  );
  const data = await res.json();
  data.forEach((j) => {
    const opt = document.createElement("option");
    opt.value = j.id_jadwal;
    opt.textContent = `${j.jam_mulai} - ${j.jam_selesai}`;
    jadwalSelect.appendChild(opt);
  });
}

async function loadReservasi() {
  const data = JSON.parse(localStorage.getItem("profileData"));
  const reservasiList = document.getElementById("reservasiList");
  if (!data || !data.id_pasien) {
    reservasiList.innerHTML = "Data pasien tidak ditemukan.";
    return;
  }
  reservasiList.innerHTML = "Memuat...";
  try {
    const res = await fetch(
      `http://localhost:3000/api/reservasi/pasien/${data.id_pasien}`
    );
    const reservasi = await res.json();
    if (!Array.isArray(reservasi) || reservasi.length === 0) {
      reservasiList.innerHTML = "Belum ada reservasi.";
      return;
    }
    reservasiList.innerHTML = reservasi
      .map(
        (r) => `
        <div style="background:#ecebff;padding:10px;border-radius:6px;margin-bottom:10px;">
          <strong>${r.nama_dokter}</strong><br>
          ${r.hari}, ${r.jam_mulai} - ${r.jam_selesai}<br>
          Status: <span style="color:${
            r.status === "baru" ? "green" : "gray"
          };font-weight:600">${r.status}</span>
          ${
            r.status === "baru"
              ? `<br><button onclick="batalkanReservasi('${r.id_reservasi}')"
                  style="margin-top:8px;background:#ff4d4f;color:#fff;border:none;padding:6px 16px;border-radius:4px;cursor:pointer;">
                  Batalkan
                </button>`
              : ""
          }
        </div>
      `
      )
      .join("");
  } catch (err) {
    reservasiList.innerHTML = "Gagal memuat data reservasi.";
  }
}

async function batalkanReservasi(id) {
  if (!confirm("Yakin ingin membatalkan reservasi ini?")) return;
  try {
    const res = await fetch(`http://localhost:3000/api/reservasi/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      alert("Reservasi berhasil dibatalkan.");
      loadReservasi();
    } else {
      alert(data.message || data.error || "Gagal membatalkan reservasi.");
    }
  } catch (err) {
    alert("Terjadi kesalahan koneksi ke server.");
  }
}

document.getElementById("spesialis").addEventListener("change", loadDokter);
document.getElementById("dokter").addEventListener("change", loadHari);
document.getElementById("hari").addEventListener("change", loadJadwal);
document.addEventListener("DOMContentLoaded", () => {
  loadSpesialis();
});
