const card = document.getElementById("card");
const petalsContainer = document.getElementById("petals");
const sparklesContainer = document.getElementById("sparkles");
const bokehContainer = document.getElementById("bokeh");

/* ---------- Frases ---------- */
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
  timer = setInterval(nextPhrase, 4500);
}

restartTimer();

/* ---------- Tarjeta ---------- */
let cardOpened = false;

card.addEventListener("click", () => {
  if (!cardOpened) {
    cardOpened = true;
    card.classList.add("open");
    confettiBurst();
    spawnHearts(10);
    restartTimer();
  }
});

/* ---------- Estallido de confeti ---------- */
function confettiBurst() {
  const rect = card.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = ["#ffd93d", "#ffb400", "#ff9500", "#7cb342", "#fff089"];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    const size = 6 + Math.random() * 10;
    el.style.cssText =
      "position:fixed;z-index:40;pointer-events:none;" +
      "left:" + cx + "px;top:" + cy + "px;" +
      "width:" + size + "px;height:" + size + "px;" +
      "background:" + colors[i % colors.length] + ";border-radius:" +
      (Math.random() > 0.5 ? "50%" : "2px") + ";opacity:0.95;";
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const dist = 100 + Math.random() * 320;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 140;

    el.animate(
      [
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        {
          transform: "translate(" + tx + "px," + ty + "px) rotate(" +
            (Math.random() * 720 - 360) + "deg)",
          opacity: 0
        }
      ],
      { duration: 1200 + Math.random() * 800, easing: "cubic-bezier(.17,.67,.44,1)" }
    ).onfinish = () => el.remove();
  }
}

/* ---------- Estallido de pétalos al tocar flores ---------- */
document.querySelectorAll(".flower").forEach((flower) => {
  flower.addEventListener("click", (e) => {
    e.stopPropagation();
    flower.classList.add("boost");
    setTimeout(() => flower.classList.remove("boost"), 500);

    const rect = flower.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + 12;
    burst(cx, cy, 18);
    spawnHearts(4);
  });
});

/* ---------- Pétalos que vuelan desde un punto ---------- */
function burst(x, y, count) {
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("div");
    petal.className = "petal-fly";
    petal.style.left = x + "px";
    petal.style.top = y + "px";
    document.body.appendChild(petal);

    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 150;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 60;
    const rot = (Math.random() * 720 - 360) + "deg";

    petal.style.setProperty("--dx", dx + "px");
    petal.style.setProperty("--dy", dy + "px");
    petal.style.setProperty("--rot", rot);
    petal.style.animationDuration = 0.9 + Math.random() * 0.7 + "s";
    petal.addEventListener("animationend", () => petal.remove());
  }
}

/* ---------- Destellos que siguen el cursor ---------- */
let lastSparkle = 0;

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastSparkle < 40) return;
  lastSparkle = now;

  const s = document.createElement("div");
  s.className = "sparkle";
  s.style.left = e.clientX + "px";
  s.style.top = e.clientY + "px";
  s.style.setProperty("--sx", (Math.random() * 70 - 35) + "px");
  s.style.setProperty("--sy", (Math.random() * 70 - 35) + "px");
  sparklesContainer.appendChild(s);
  s.addEventListener("animationend", () => s.remove());
});

/* ---------- Corazones flotantes ---------- */
const hearts = ["💛", "🌻", "✨", "💛", "🌟"];

function spawnHearts(count) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "floating-heart";
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.bottom = "10vh";
    h.style.fontSize = 18 + Math.random() * 26 + "px";
    h.style.animationDuration = 2.4 + Math.random() * 2.2 + "s";
    document.body.appendChild(h);
    h.addEventListener("animationend", () => h.remove());
  }
}

setInterval(() => {
  if (Math.random() > 0.45) spawnHearts(1);
}, 1600);

/* ---------- Pétalos cayendo continuamente ---------- */
const PETAL_COUNT = 26;

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

/* ---------- Bokeh de fondo ---------- */
for (let i = 0; i < 16; i++) {
  const d = document.createElement("div");
  d.className = "bokeh-dot";
  const size = 20 + Math.random() * 60;
  d.style.width = size + "px";
  d.style.height = size + "px";
  d.style.left = Math.random() * 100 + "vw";
  d.style.top = Math.random() * 100 + "vh";
  d.style.animationDuration = 5 + Math.random() * 6 + "s";
  d.style.animationDelay = -Math.random() * 6 + "s";
  bokehContainer.appendChild(d);
}