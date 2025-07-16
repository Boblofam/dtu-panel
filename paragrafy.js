// Początkowe dane
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
        <button onclick="removeParagraf('${section}', ${index})" style="margin-top:10px;">Usuń</button>
      `;
      container.appendChild(card);
    });
  });
}

function removeParagraf(section, index) {
  paragrafy[section].splice(index, 1);
  renderParagrafy();
}

document.getElementById("addForm").addEventListener("submit", function(e) {
  e.preventDefault();
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

renderParagrafy();
