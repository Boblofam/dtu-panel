// Lista użytkowników (UID: hasło)
const users = {
  "99394": "tajnehaslo1",
  "21337": "tajnehaslo2",
  "admin": "admin123"
};

function login() {
  const uid = document.getElementById("uid").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error");

  if (users[uid] && users[uid] === password) {
    // Poprawne logowanie
    window.location.href = "dashboard.html";
  } else {
    // Błąd logowania
    errorMsg.textContent = "Nieprawidłowy UID lub hasło.";
  }
}
