document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const uid = document.getElementById("uid").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[uid] && users[uid].password === password) {
    localStorage.setItem("role", users[uid].role);
    localStorage.setItem("uid", uid);
    window.location.href = "dashboard.html";
  } else {
    alert("Nieprawidłowy UID lub hasło.");
  }
});
