// Inicjalizacja użytkowników, jeśli ich nie ma
let users = JSON.parse(localStorage.getItem("users"));
if (!users || Object.keys(users).length === 0) {
  users = {
    "99394": { password: "tajnehaslo1", role: "viewer" },
    "21337": { password: "tajnehaslo2", role: "viewer" },
    "admin": { password: "admin123", role: "admin" }
  };
  localStorage.setItem("users", JSON.stringify(users));
}

// Obsługa formularza logowania
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const uid = document.getElementById("uid").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || {};
  const errorEl = document.getElementById("login-error");

  errorEl.style.display = "none";

  if (users[uid] && users[uid].password === password) {
    localStorage.setItem("uid", uid);
    localStorage.setItem("role", users[uid].role);
    window.location.href = "dashboard.html";
  } else {
    errorEl.textContent = "Nieprawidłowy UID lub hasło.";
    errorEl.style.display = "block";
  }
});
