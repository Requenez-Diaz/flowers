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

const messages = document.querySelectorAll(".message");
const dots = document.getElementById("dots");
let current = 0;
let timer;

messages.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => {
    showPhrase(i);
    restartTimer();
  });
  dots.appendChild(dot);
});

const dotEls = document.querySelectorAll(".dot");

function showPhrase(index) {
  messages[current].classList.remove("active");
  dotEls[current].classList.remove("active");
  current = index;
  messages[current].classList.add("active");
  dotEls[current].classList.add("active");
}

function nextPhrase() {
  showPhrase((current + 1) % messages.length);
}

function restartTimer() {
  clearInterval(timer);
  timer = setInterval(nextPhrase, 4000);
}

restartTimer();