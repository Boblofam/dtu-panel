// Gotowy plik paragrafy.js z poprawną obsługą ról

const paragrafy = {
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

// Obsługa roli użytkownika z localStorage
const uid = localStorage.getItem("uid");
const role = localStorage.getItem("role");

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

      // Dodaj przycisk usuń tylko dla admina
      if (role === "admin") {
        const btn = document.createElement("button");
        btn.textContent = "Usuń";
        btn.style.marginTop = "10px";
        btn.onclick = () => removeParagraf(section, index);
        card.appendChild(btn);
      }

      container.appendChild(card);
    });
  });
}

function removeParagraf(section, index) {
  if (role !== "admin") return;
  paragrafy[section].splice(index, 1);
  renderParagrafy();
}

const form = document.getElementById("addForm");
if (form) {
  form.addEventListener("submit", function(e) {
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
    renderParagrafy();
    e.target.reset();
  });
}

function createUser() {
  if (role !== "admin") return;
  const newUid = document.getElementById("new-uid").value;
  const newPass = document.getElementById("new-pass").value;
  alert(`Stworzono użytkownika ${newUid} z hasłem: ${newPass} (tylko viewer)\nMusisz go dodać ręcznie do pliku users w script.js.`);
}

// Ukryj panel admina jeśli nie admin
window.addEventListener("DOMContentLoaded", () => {
  if (role === "admin") {
    document.getElementById("admin-controls").style.display = "block";
  }

  renderParagrafy();
});
