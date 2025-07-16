// Lista użytkowników
const users = {
  "admin": { password: "admin123", role: "admin" },
  "99394": { password: "tajnehaslo1", role: "viewer" },
  "21337": { password: "tajnehaslo2", role: "viewer" }
};

function login() {
  const uid = document.getElementById("uid").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error");

  if (users[uid] && users[uid].password === password) {
    localStorage.setItem("uid", uid);
    localStorage.setItem("role", users[uid].role);
    window.location.href = "dashboard.html";
  } else {
    errorMsg.textContent = "Nieprawidłowy UID lub hasło.";
  }
}
