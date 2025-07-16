// Wczytaj dane z localStorage lub użyj domyślnych
let users = JSON.parse(localStorage.getItem("users")) || {
  "99394": { password: "tajnehaslo1", role: "viewer" },
  "21337": { password: "tajnehaslo2", role: "viewer" },
  "admin": { password: "admin123", role: "admin" }
};

let paragrafy = JSON.parse(localStorage.getItem("paragrafy")) || {
  A: [
    { title: "Niestawienie się na RG", code: "A.1", penalty: "Warn" },
    { title: "Brak reakcji na ogłoszenia DTU", code: "A.2", penalty: "Warn" }
  ],
  B: [
    { title: "Nieodpowiednie zachowanie", code: "B.1", penalty: "Warn" }
  ],
  C: []
};

localStorage.setItem("paragrafy", JSON.stringify(paragrafy));
;

// Zapisz dane do localStorage
function saveData() {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("paragrafy", JSON.stringify(paragrafy));
}

// Sprawdzenie roli
const role = localStorage.getItem("role");

// Renderowanie paragrafów
function renderParagrafy() {
  ["A", "B", "C"].forEach(section => {
    const container = document.getElementById("group-" + section);
    container.innerHTML = "";

    paragrafy[section].forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p><strong>Paragraf:</strong> ${item.code}</p>
        <p><strong>Kara:</strong> ${item.penalty}</p>
      `;

      if (role === "admin") {
        const delBtn = document.createElement("button");
        delBtn.textContent = "Usuń";
        delBtn.onclick = () => {
          paragrafy[section].splice(index, 1);
          saveData();
          renderParagrafy();
        };
        card.appendChild(delBtn);
      }

      container.appendChild(card);
    });
  });
}

// Dodawanie paragrafu
const addForm = document.getElementById("addForm");
if (addForm) {
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (role !== "admin") return;

    const section = document.getElementById("section").value.toUpperCase();
    const title = document.getElementById("title").value;
    const code = document.getElementById("code").value;
    const penalty = document.getElementById("penalty").value;

    if (!paragrafy[section]) {
      alert("Nieprawidłowa sekcja! Użyj A, B lub C.");
      return;
    }

    paragrafy[section].push({ title, code, penalty });
    saveData();
    renderParagrafy();
    e.target.reset();
  });
}

// Tworzenie użytkownika
function createUser() {
  if (role !== "admin") {
    alert("Brak uprawnień");
    return;
  }

  const uid = document.getElementById("new-uid").value;
  const pass = document.getElementById("new-pass").value;

  if (!uid || !pass) {
    alert("Wprowadź UID i hasło.");
    return;
  }

  if (users[uid]) {
    alert("Użytkownik już istnieje!");
    return;
  }

  users[uid] = { password: pass, role: "viewer" };
  saveData();
  alert(`Użytkownik ${uid} utworzony jako viewer.`);
}

// Pokazuj panel admina tylko adminowi
window.onload = function () {
  if (role === "admin") {
    document.getElementById("admin-controls").style.display = "block";
  } else {
    document.getElementById("admin-controls").style.display = "none";
  }

  renderParagrafy();
};
