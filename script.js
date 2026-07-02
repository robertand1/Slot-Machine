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
  let currentDelay = 40;
  let spinCount = 0;
  const maxSpins = 25;
  function spinTick() {
    elements.r1Bot.innerText = elements.r1Mid.innerText;
    elements.r1Mid.innerText = elements.r1Top.innerText;
    elements.r1Top.innerText = getRandomSymbol();

    elements.r2Bot.innerText = elements.r2Mid.innerText;
    elements.r2Mid.innerText = elements.r2Top.innerText;
    elements.r2Top.innerText = getRandomSymbol();

    elements.r3Bot.innerText = elements.r3Mid.innerText;
    elements.r3Mid.innerText = elements.r3Top.innerText;
    elements.r3Top.innerText = getRandomSymbol();
    ++spinCount;
    if (spinCount > 15) {
      currentDelay += 30;
    }
    if (spinCount < maxSpins) {
      setTimeout(spinTick, currentDelay);
    } else {
      checkWin(
        elements.r1Mid.innerText,
        elements.r2Mid.innerText,
        elements.r3Mid.innerText,
      );
    }
  }
  setTimeout(spinTick, currentDelay);
}

function checkWin(v1, v2, v3) {
  if (v1 === v2 && v2 === v3) {
    showMessage("JACKPOT! + 50 RON!");
    updateBalance(balance + 50);
  } else {
    showMessage("No win. Try again!");
  }
  isSpinning = false;
  if (balance < 10) {
    function warnFunds() {
      showMessage("OUT OF FUNDS!");
    }
    setTimeout(warnFunds, 1000);
  } else {
    document.getElementById("spinBtn").disabled = false;
  }
}
