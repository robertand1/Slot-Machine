<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    <title>Slot Machine</title>
  </head>
  <body
    class="bg-dark text-white d-flex align-items-center justify-content-center vh-100"
  >
    <div class="text-center">
      <h2 class="mb-5">CREDIT: <span id="balance">100</span> RON</h2>
      <div class="d-flex justify-content-center gap-4 mb-5">
        <div class="d-flex flex-column align-items-center">
          <div
            id="r1-top"
            class="border border-secondary rounded p-2 mb-1 bg-dark opacity-50"
            style="font-size: 2rem; min-width: 70px"
          >
            💎
          </div>
          <div
            id="r1-mid"
            class="border border-warning rounded p-3 my-2 bg-secondary shadow"
            style="font-size: 4rem; min-width: 120px"
          >
            🍒
          </div>
          <div
            id="r1-bot"
            class="border border-secondary rounded p-2 mt-1 bg-dark opacity-50"
            style="font-size: 2rem; min-width: 70px"
          >
            7️⃣
          </div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <div
            id="r2-top"
            class="border border-secondary rounded p-2 mb-1 bg-dark opacity-50"
            style="font-size: 2rem; min-width: 70px"
          >
            🔔
          </div>
          <div
            id="r2-mid"
            class="border border-warning rounded p-3 my-2 bg-secondary shadow"
            style="font-size: 4rem; min-width: 120px"
          >
            🍋
          </div>
          <div
            id="r2-bot"
            class="border border-secondary rounded p-2 mt-1 bg-dark opacity-50"
            style="font-size: 2rem; min-width: 70px"
          >
            🍒
          </div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <div
            id="r3-top"
            class="border border-secondary rounded p-2 mb-1 bg-dark opacity-50"
            style="font-size: 2rem; min-width: 70px"
          >
            🍒
          </div>
          <div
            id="r3-mid"
            class="border border-warning rounded p-3 my-2 bg-secondary shadow"
            style="font-size: 4rem; min-width: 120px"
          >
            🔔
          </div>
          <div
            id="r3-bot"
            class="border border-secondary rounded p-2 mt-1 bg-dark opacity-50"
            style="font-size: 2rem; min-width: 70px"
          >
            💎
          </div>
        </div>
      </div>
      <button
        id="spinBtn"
        class="btn btn-danger btn-lg px-5 fw-bold shadow"
        onclick="spin()"
      >
        SPIN (- 10 RON)
      </button>
      <div id="status" class="mt-4 fw-bold text-white fs-5">Play now!</div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
