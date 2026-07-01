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

function spin() {
  if (isSpinning || balance < 10) {
    return;
  }
  isSpinning = true;
  document.getElementById("spinBtn").disabled = true;
  showMessage("Spinning...");
  updateBalance(balance - 10);
  const r1 = document.getElementById("r1");
  const r2 = document.getElementById("r2");
  const r3 = document.getElementById("r3");
  function changeSimboluri() {
    r1.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    r2.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    r3.innerText = symbols[Math.floor(Math.random() * symbols.length)];
  }
  const rollInterval = setInterval(changeSimboluri, 80);
  function opresteRolele() {
    clearInterval(rollInterval);
    checkWin(r1.innerText, r2.innerText, r3.innerText);
  }
  setTimeout(opresteRolele, 1500);
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
    function avertizareFonduri() {
      showMessage("OUT OF FUNDS!");
    }
    setTimeout(avertizareFonduri, 1000);
  } else {
    document.getElementById("spinBtn").disabled = false;
  }
}
