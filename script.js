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

function getReelElements() {
  return {
    r1Top: document.getElementById("r1-top"),
    r1Mid: document.getElementById("r1-mid"),
    r1Bot: document.getElementById("r1-bot"),
    r2Top: document.getElementById("r2-top"),
    r2Mid: document.getElementById("r2-mid"),
    r2Bot: document.getElementById("r2-bot"),
    r3Top: document.getElementById("r3-top"),
    r3Mid: document.getElementById("r3-mid"),
    r3Bot: document.getElementById("r3-bot"),
  };
}

function spin() {
  if (isSpinning || balance < 10) {
    return;
  }
  isSpinning = true;
  document.getElementById("spinBtn").disabled = true;
  showMessage("Spinning...");
  updateBalance(balance - 10);
  const elements = getReelElements();
  function animateReel(topEl, midEl, botEl, totalDuration, isLastReel) {
    let currentDelay = 50;
    let elapsedTime = 0;
    function tick() {
      botEl.innerText = midEl.innerText;
      midEl.innerText = topEl.innerText;
      topEl.innerText = getRandomSymbol();
      elapsedTime += currentDelay;
      if (elapsedTime > totalDuration - 500) {
        currentDelay += 20;
      }
      if (elapsedTime < totalDuration) {
        setTimeout(tick, currentDelay);
      } else {
        if (isLastReel) {
          checkWin();
        }
      }
    }
    setTimeout(tick, currentDelay);
  }
  animateReel(elements.r1Top, elements.r1Mid, elements.r1Bot, 1000, false);
  animateReel(elements.r2Top, elements.r2Mid, elements.r2Bot, 1500, false);
  animateReel(elements.r3Top, elements.r3Mid, elements.r3Bot, 2000, true);
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
    setTimeout(() => {
      showMessage("OUT OF FUNDS!");
    }, 1000);
  } else {
    document.getElementById("spinBtn").disabled = false;
  }
}
