const card = document.getElementById("card");

card.addEventListener("click", () => {
  card.classList.toggle("open");
});

const petalsContainer = document.getElementById("petals");
const PETAL_COUNT = 28;

function createPetal() {
  const petal = document.createElement("div");
  petal.className = "falling-petal";

  const size = 8 + Math.random() * 10;
  petal.style.width = size + "px";
  petal.style.height = size * 1.5 + "px";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 5 + Math.random() * 7 + "s";
  petal.style.animationDelay = -Math.random() * 12 + "s";
  petal.style.opacity = 0.6 + Math.random() * 0.4;

  petalsContainer.appendChild(petal);
}

for (let i = 0; i < PETAL_COUNT; i++) {
  createPetal();
}