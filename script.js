const symbols = ["🍒", "🍋", "🔔", "💎", "7️⃣"];
let balance = 100;
let isSpinning = false;

const speedClasses = [40, 50, 70, 100, 150, 220, 310, 440, 600, 800];

const reelState = {
  r1: {
    extra: "r1-extra",
    top: "r1-top",
    mid: "r1-mid",
    bot: "r1-bot",
    maxFastTicks: 20,
    currentTick: 0,
    speedIndex: 0,
    isLast: false,
  },
  r2: {
    extra: "r2-extra",
    top: "r2-top",
    mid: "r2-mid",
    bot: "r2-bot",
    maxFastTicks: 35,
    currentTick: 0,
    speedIndex: 0,
    isLast: false,
  },
  r3: {
    extra: "r3-extra",
    top: "r3-top",
    mid: "r3-mid",
    bot: "r3-bot",
    maxFastTicks: 50,
    currentTick: 0,
    speedIndex: 0,
    isLast: true,
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

function noFunds() {
  showMessage("OUT OF FUNDS!");
}

function reelTick(reelId) {
  const state = reelState[reelId];
  const container = document.getElementById(reelId + "-container");
  const extraEl = document.getElementById(state.extra);
  const topEl = document.getElementById(state.top);
  const midEl = document.getElementById(state.mid);
  const botEl = document.getElementById(state.bot);
  container.className = "reel-container reel-snap";
  if (state.currentTick > 0) {
    botEl.innerText = midEl.innerText;
    midEl.innerText = topEl.innerText;
    topEl.innerText = extraEl.innerText;
  }
  extraEl.innerText = getRandomSymbol();
  void container.offsetWidth;
  state.currentTick++;
  if (state.currentTick > state.maxFastTicks) {
    state.speedIndex++;
  }
  if (state.speedIndex < speedClasses.length) {
    const currentSpeed = speedClasses[state.speedIndex];
    container.className = `reel-container reel-slide speed-${currentSpeed}`;
    setTimeout(reelTick, currentSpeed, reelId);
  } else {
    container.className = "reel-container reel-bounce";
    if (state.isLast) {
      setTimeout(checkWin, 400);
    }
  }
}

function startReel(reelId) {
  const state = reelState[reelId];
  const container = document.getElementById(reelId + "-container");
  container.className = "reel-container";
  state.currentTick = 0;
  state.speedIndex = 0;
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
    setTimeout(noFunds, 1000);
  } else {
    document.getElementById("spinBtn").disabled = false;
  }
}
