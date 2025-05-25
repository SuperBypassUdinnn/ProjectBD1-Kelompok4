function openPopup(id) {
  document.body.style.overflow = "hidden";
  document.getElementById(id).classList.add("open");
  if (id === "profilePopup" && typeof fillProfilePopup === "function")
    fillProfilePopup();
}

function closePopup(id) {
  document.body.style.overflow = "";
  document.getElementById(id).classList.remove("open");
  if (id === "loginPopup") {
    document.getElementById("loginUser").value = "";
    document.getElementById("loginPass").value = "";
  }
  if (id === "registerPopup") {
    document.getElementById("regUser").value = "";
    document.getElementById("regPass").value = "";
    document.getElementById("regPassConfirm").value = "";
  }
}

function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
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

// Prevent close popup when clicking inside
document.querySelectorAll(".popupInner").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

// Keyboard accessibility: ESC to close, ENTER to next/submit
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    [
      "loginPopup",
      "registerPopup",
      "profilePopup",
      "bookingPopup",
      "reservationPopup",
      "consultationPopup",
      "infoPopup",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.classList.contains("open")) closePopup(id);
    });
  }
  if (e.key === "Enter") {
    if (document.getElementById("loginPopup")?.classList.contains("open")) {
      const user = document.getElementById("loginUser");
      const pass = document.getElementById("loginPass");
      if (document.activeElement === user) {
        pass.focus();
        e.preventDefault();
      } else if (document.activeElement === pass) {
        if (typeof handleLogin === "function") handleLogin();
        e.preventDefault();
      }
    }
    if (document.getElementById("registerPopup")?.classList.contains("open")) {
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
        if (typeof handleRegister === "function") handleRegister();
        e.preventDefault();
      }
    }
  }
});
