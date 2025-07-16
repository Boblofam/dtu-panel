document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const uid = document.getElementById("uid").value;
  const pass = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[uid] && users[uid].password === pass) {
    localStorage.setItem("uid", uid);
    localStorage.setItem("role", users[uid].role);
    window.location.href = "dashboard.html";
  } else {
    alert("Nieprawidłowy UID lub hasło.");
  }
});
