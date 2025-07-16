// Dashboard (paragrafy.js lub script.js) — gotowa wersja z localStorage i obsługą admina

// Wczytaj dane użytkowników z localStorage albo ustaw domyślne
let users = JSON.parse(localStorage.getItem("users")) || {
  "99394": { password: "tajnehaslo1", role: "viewer" },
  "21337": { password: "tajnehaslo2", role: "viewer" },
  "admin": { password: "admin123", role: "admin" }
};
localStorage.setItem("users", JSON.stringify(users));

// Wczytaj dane paragrafów z localStorage albo ustaw domyślne
let paragrafy = JSON.parse(localStorage.getItem("paragrafy")) || {
  A: [
    { title: "Niestawienie się na RG", code: "A.1", penalty: "Warn" },
    { title: "Brak reakcji na ogłoszenia DTU", code: "A.2", penalty: "Warn" },
    { title: "Nieusprawiedliwiona nieobecność na zadaniach", code: "A.3", penalty: "Warn" },
    { title: "Powtarzająca się nieaktywność wydziałowa", code: "A.4", penalty: "LOTA" }
  ],
  B: [
    { title: "Nieodpowiednie zachowanie na RG lub zadaniu", code: "B.1", penalty: "Warn" },
    { title: "Brak szacunku wobec członków wydziału", code: "B.2", penalty: "Warn" },
    { title: "Sianie dezinformacji lub toksyczna postawa", code: "B.3", penalty: "LOTA" },
    { title: "Działanie na szkodę wydziału", code: "B.4", penalty: "Blacklista" }
  ],
  C: [
    { title: "Wykonywanie zadań DTU bez odpowiednich rang", code: "C.1", penalty: "Warn" },
    { title: "Samowolne prowadzenie akcji wydziałowych", code: "C.2", penalty: "Warn" },
    { title: "Fałszywe raportowanie lub zawyżanie statystyk", code: "C.3", penalty: "LOTA" }
  ]
};
localStorage.setItem("paragrafy", JSON.stringify(paragrafy));

// Sprawdzenie roli użytkownika z localStorage
const role = localStorage.getItem("role");
if (!role) {
  window.location.href = "index.html";
}

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
        delBtn.style.marginTop = "10px";
        delBtn.onclick = () => removeParagraf(section, index);
        card.appendChild(delBtn);
      }

      container.appendChild(card);
    });
  });
}

function removeParagraf(section, index) {
  if (role !== "admin") return;
  paragrafy[section].splice(index, 1);
  localStorage.setItem("paragrafy", JSON.stringify(paragrafy));
  renderParagrafy();
}

const addForm = document.getElementById("addForm");
if (addForm) {
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (role !== "admin") return;

    const section = document.getElementById("section").value.toUpperCase();
    const title = document.getElementById("title").value;
    const code = document.getElementById("code").value;
    const penalty = document.getElementById("penalty").value;

    if (!title || !code || !penalty) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    if (!paragrafy[section]) {
      paragrafy[section] = []; // umożliwia nowe sekcje np. D
    }

    paragrafy[section].push({ title, code, penalty });
    localStorage.setItem("paragrafy", JSON.stringify(paragrafy));
    renderParagrafy();
    e.target.reset();
  });
}

function createUser() {
  if (role !== "admin") return;

  const uid = document.getElementById("new-uid").value;
  const pass = document.getElementById("new-pass").value;

  if (!uid || !pass) {
    alert("Wprowadź UID i hasło.");
    return;
  }

  let currentUsers = JSON.parse(localStorage.getItem("users")) || {};
  if (currentUsers[uid]) {
    alert("Użytkownik o tym UID już istnieje.");
    return;
  }

  currentUsers[uid] = { password: pass, role: "viewer" };
  localStorage.setItem("users", JSON.stringify(currentUsers));
  users = currentUsers; // aktualizacja globalnej zmiennej

  alert(`Stworzono użytkownika ${uid} z hasłem: ${pass} (tylko viewer)`);
}

function logout() {
  localStorage.removeItem("uid");
  localStorage.removeItem("role");
  window.location.href = "index.html";
}

window.onload = function () {
  if (role === "admin") {
    document.getElementById("admin-controls").style.display = "block";
  } else {
    document.getElementById("admin-controls").style.display = "none";
  }

  renderParagrafy();
};
