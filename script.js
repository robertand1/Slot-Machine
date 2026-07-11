const symbols = ["🍒", "🍋", "🔔", "💎", "7️⃣"];
let balance = 100;
let isSpinning = false;

function showMessage(text) {
  const statusEl = document.getElementById("status");
  statusEl.innerText = text;
  statusEl.className = "mt-4 fw-bold fs-5 text-white";
}

function updateBalance(target) {
  balance = target;
  document.getElementById("balance").innerText = balance;
}

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function buildArrayAndSpin(reelId, spinClass, durationMs) {
  const strip = document.getElementById(reelId + "-strip");
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 30; i++) {
    const div = document.createElement("div");
    div.classList.add("symbol");
    if (i === 0 || i === 2) {
      div.classList.add("opacity-50");
    }
    div.innerText = getRandomSymbol();
    fragment.appendChild(div);
  }
  strip.insertBefore(fragment, strip.firstChild);
  strip.classList.add("reel-snap");
  void strip.offsetWidth;
  strip.classList.replace("reel-snap", spinClass);
  setTimeout(() => {
    while (strip.children.length > 3) {
      strip.removeChild(strip.lastChild);
    }
    strip.classList.remove(spinClass);
  }, durationMs + 50);
}

function spin() {
  if (isSpinning || balance < 10) {
    return;
  }
  isSpinning = true;
  document.getElementById("spinBtn").disabled = true;
  showMessage("Spinning...");
  updateBalance(balance - 10);
  buildArrayAndSpin("r1", "spin-fast", 2000);
  buildArrayAndSpin("r2", "spin-med", 3000);
  buildArrayAndSpin("r3", "spin-slow", 4000);
  setTimeout(checkWin, 4100);
}

function checkWin() {
  const v1 = document.getElementById("r1-strip").children[1].innerText;
  const v2 = document.getElementById("r2-strip").children[1].innerText;
  const v3 = document.getElementById("r3-strip").children[1].innerText;
  if (v1 === v2 && v2 === v3) {
    showMessage("JACKPOT! + 50 RON!");
    updateBalance(balance + 50);
  } else {
    showMessage("No win. Try again!");
  }
  isSpinning = false;
  if (balance < 10) {
    setTimeout(() => showMessage("OUT OF FUNDS!"), 1000);
  } else {
    document.getElementById("spinBtn").disabled = false;
  }
}
