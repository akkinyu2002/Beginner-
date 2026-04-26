const tips = [
  "Coding tip: Break a big problem into tiny steps.",
  "Bug tip: Read errors slowly, one line at a time.",
  "Logic tip: If you can explain it, you can code it.",
  "Practice tip: 20 minutes every day is powerful.",
  "Focus tip: First make it work, then make it better."
];

const tipBtn = document.getElementById("tipBtn");
const tipBox = document.getElementById("tipBox");

if (tipBtn && tipBox) {
  tipBtn.addEventListener("click", () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipBox.textContent = randomTip;
  });
}

const lessonSearch = document.getElementById("lessonSearch");
const cards = document.querySelectorAll(".track-card");

if (lessonSearch && cards.length) {
  lessonSearch.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase().trim();

    cards.forEach((card) => {
      const searchableText = card.dataset.name || "";
      const shouldShow = searchableText.includes(query);
      card.classList.toggle("hidden", !shouldShow);
    });
  });
}
