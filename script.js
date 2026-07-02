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

function getElements() {
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
  const elements = getElements();
  function changeSymbols() {
    for (let key in elements) {
      elements[key].innerText = getRandomSymbol();
    }
  }
  const rollInterval = setInterval(changeSymbols, 80);
  function stopReels() {
    clearInterval(rollInterval);
    checkWin(
      elements.r1Mid.innerText,
      elements.r2Mid.innerText,
      elements.r3Mid.innerText,
    );
  }
  setTimeout(stopReels, 1500);
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
