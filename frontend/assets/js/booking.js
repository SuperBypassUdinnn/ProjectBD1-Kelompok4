function submitBooking() {
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
