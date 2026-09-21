const card = document.getElementById("card");
const petalsContainer = document.getElementById("petals");
const sparklesContainer = document.getElementById("sparkles");
const bokehContainer = document.getElementById("bokeh");
const scene = document.getElementById("scene");
const intro = document.getElementById("intro");
const surpriseBtn = document.getElementById("surpriseBtn");
const finale = document.getElementById("finale");

const name = "Wizleyling";

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

/* ---------- Intro / regalo ---------- */
document.getElementById("openBtn").addEventListener("click", () => {
  intro.classList.add("hidden");
  scene.classList.add("show");
  confettiBurst(window.innerWidth / 2, window.innerHeight / 2);
  spawnHearts(12);
  setTimeout(() => {
    resolveCardPosition();
  }, 50);
});

/* ---------- Tarjeta ---------- */
let resolveCardPosition = () => {};
let cardOpened = false;

card.addEventListener("click", () => {
  if (cardOpened) return;
  cardOpened = true;
  card.classList.add("open");
  burst(card.left + card.width / 2, card.top + 30, 24);
  spawnHearts(10);
  restartTimer();
});

/* La tarjeta se usa igual para el estallido */
resolveCardPosition = () => {
  const rect = card.getBoundingClientRect();
  card.left = rect.left;
  card.top = rect.top;
  card.width = rect.width;
};

window.addEventListener("resize", resolveCardPosition);

/* ---------- Estallido de confeti ---------- */
function confettiBurst(cx, cy) {
  const colors = ["#ffd93d", "#ffb400", "#ff9500", "#7cb342", "#fff089"];
  const count = 70;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    const size = 6 + Math.random() * 10;
    el.style.cssText =
      "position:fixed;z-index:80;pointer-events:none;" +
      "left:" + cx + "px;top:" + cy + "px;" +
      "width:" + size + "px;height:" + size + "px;" +
      "background:" + colors[i % colors.length] + ";border-radius:" +
      (Math.random() > 0.5 ? "50%" : "2px") + ";opacity:0.95;";
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 300;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 160;

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
    burst(rect.left + rect.width / 2, rect.top + 12, 18);
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

/* ---------- Destellos del cursor ---------- */
let lastSparkle = 0;

document.addEventListener("pointermove", (e) => {
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

/* ---------- Pétalos cayendo ---------- */
for (let i = 0; i < 26; i++) {
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

/* ---------- Bokeh ---------- */
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

/* =========================================================
   FINALE: el nombre escrito en estrellas del cielo nocturno
   ========================================================= */
function showFinale() {
  document.getElementById("card").style.opacity = "0";
  document.querySelector(".surprise-btn").style.display = "none";
  finale.classList.add("show");

  createSkyStars(90);
  spawnShootingStars();
  buildFinaleName();
  confettiBurst(window.innerWidth / 2, window.innerHeight * 0.35);
  spawnHearts(14);
}

function createSkyStars(count) {
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "sky-star";
    const size = 1 + Math.random() * 3;
    s.style.width = size + "px";
    s.style.height = size + "px";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    s.style.animationDuration = 1.5 + Math.random() * 3 + "s";
    s.style.animationDelay = -Math.random() * 3 + "s";
    finale.appendChild(s);
  }
}

function spawnShootingStars() {
  const shootIt = () => {
    const star = document.createElement("div");
    star.className = "shooting";
    star.style.top = 5 + Math.random() * 30 + "vh";
    star.style.animationDuration = 1.6 + Math.random() * 1.4 + "s";
    finale.appendChild(star);
    star.addEventListener("animationend", () => star.remove());
    const wait = 1800 + Math.random() * 4000;
    shootTimer = setTimeout(shootIt, wait);
  };
  let shootTimer = setTimeout(shootIt, 900);
  window.addEventListener("beforeunload", () => clearTimeout(shootTimer));
}

function buildFinaleName() {
  const nameEl = document.getElementById("finaleName");
  nameEl.innerHTML = "";
  const letters = name.split("");
  letters.forEach((letter, i) => {
    const span = document.createElement("span");
    span.className = "finale-name-letter";
    span.style.animationDelay = (0.4 + i * 0.22) + "s";
    span.textContent = letter;
    nameEl.appendChild(span);
  });

  const totalDelay = 400 + letters.length * 220 + 500;
  setTimeout(() => {
    document.querySelectorAll(".finale-name-letter").forEach((span, i) => {
      span.classList.add("twinkle");
      span.style.animationDelay = (i * 80) % 700 + "ms";
      span.style.animationDuration = 1.7 + (i % 3) * 0.5 + "s";
    });
  }, totalDelay);
}

surpriseBtn.addEventListener("click", showFinale);