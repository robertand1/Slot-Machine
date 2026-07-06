const symbols = ["🍒", "🍋", "🔔", "💎", "7️⃣"];
let balance = 100;
let isSpinning = false;

const reelState = {
  r1: {
    top: "r1-top",
    mid: "r1-mid",
    bot: "r1-bot",
    duration: 2000,
    isLast: false,
    delay: 40,
    elapsed: 0,
    isBraking: false,
  },
  r2: {
    top: "r2-top",
    mid: "r2-mid",
    bot: "r2-bot",
    duration: 2600,
    isLast: false,
    delay: 40,
    elapsed: 0,
    isBraking: false,
  },
  r3: {
    top: "r3-top",
    mid: "r3-mid",
    bot: "r3-bot",
    duration: 3200,
    isLast: true,
    delay: 40,
    elapsed: 0,
    isBraking: false,
  },
};

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

function getReelElements() {
  return {
    r1Mid: document.getElementById("r1-mid"),
    r2Mid: document.getElementById("r2-mid"),
    r3Mid: document.getElementById("r3-mid"),
  };
}

function applyCSSClass(reelId, newClass) {
  const state = reelState[reelId];
  const elements = [
    document.getElementById(state.top),
    document.getElementById(state.mid),
    document.getElementById(state.bot),
  ];
  elements.forEach((el) => {
    el.classList.remove("reel-spin", "reel-slow", "reel-stop");
    el.classList.add(newClass);
  });
}

function handleNoFunds() {
  showMessage("OUT OF FUNDS!");
}

function reelTick(reelId) {
  const state = reelState[reelId];
  const topEl = document.getElementById(state.top);
  const midEl = document.getElementById(state.mid);
  const botEl = document.getElementById(state.bot);
  botEl.innerText = midEl.innerText;
  midEl.innerText = topEl.innerText;
  topEl.innerText = getRandomSymbol();
  state.elapsed += state.delay;
  if (state.elapsed > state.duration - 1200) {
    state.delay += 40;
    if (!state.isBraking) {
      state.isBraking = true;
      applyCSSClass(reelId, "reel-slow");
    }
  }
  if (state.elapsed < state.duration) {
    setTimeout(reelTick, state.delay, reelId);
  } else {
    applyCSSClass(reelId, "reel-stop");
    if (state.isLast) {
      setTimeout(checkWin, 400);
    }
  }
}

function startReel(reelId) {
  const state = reelState[reelId];
  state.delay = 40;
  state.elapsed = 0;
  state.isBraking = false;
  applyCSSClass(reelId, "reel-spin");
  reelTick(reelId);
}

function spin() {
  if (isSpinning || balance < 10) {
    return;
  }
  isSpinning = true;
  document.getElementById("spinBtn").disabled = true;
  showMessage("Spinning...");
  updateBalance(balance - 10);
  startReel("r1");
  startReel("r2");
  startReel("r3");
}

function checkWin() {
  const elements = getReelElements();
  const v1 = elements.r1Mid.innerText;
  const v2 = elements.r2Mid.innerText;
  const v3 = elements.r3Mid.innerText;
  if (v1 === v2 && v2 === v3) {
    showMessage("JACKPOT! + 50 RON!");
    updateBalance(balance + 50);
  } else {
    showMessage("No win. Try again!");
  }
  isSpinning = false;
  if (balance < 10) {
    setTimeout(handleNoFunds, 1000);
  } else {
    document.getElementById("spinBtn").disabled = false;
  }
}
