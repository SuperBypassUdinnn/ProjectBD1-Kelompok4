async function submitBooking() {
  const spesialis = document.getElementById("spesialis").value;
  const dokter = document.getElementById("dokter").value;
  const hari = document.getElementById("hari").value;
  const jadwal = document.getElementById("jadwal").value;
  const keluhan = document.getElementById("keluhan").value.trim();

  // Ambil id_pasien dari localStorage
  const profileData = JSON.parse(localStorage.getItem("profileData") || "{}");
  const id_pasien = profileData.id_pasien;

  if (!spesialis || !dokter || !hari || !jadwal || !keluhan) {
    alert("Mohon lengkapi semua data reservasi.");
    return;
  }
  if (!id_pasien) {
    alert("Data pasien tidak ditemukan. Silakan login ulang.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/reservasi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_pasien,
        id_jadwal: jadwal,
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

document.getElementById("spesialis").addEventListener("change", loadDokter);
document.getElementById("dokter").addEventListener("change", loadHari);
document.getElementById("hari").addEventListener("change", loadJadwal);
document.addEventListener("DOMContentLoaded", () => {
  loadSpesialis();
});
