const comparison = document.getElementById("comparison");

const beforeImage = document.getElementById("beforeImage");

const comparisonLine = document.getElementById("comparisonLine");

const comparisonHandle = document.getElementById("comparisonHandle");

let isDragging = false;

/* =========================================
   MOVE SLIDER
========================================= */

function moveSlider(clientX) {
  /*
        Розміри slider
    */

  const rect = comparison.getBoundingClientRect();

  /*
        Позиція мишки
        відносно slider
    */

  let x = clientX - rect.left;

  /*
        Не дозволяємо
        вийти за межі
    */

  x = Math.max(0, Math.min(x, rect.width));

  /*
        Перетворюємо
        pixels → percentage

        Наприклад:

        x = 300px
        width = 1000px

        percentage = 30
    */

  const percentage = (x / rect.width) * 100;

  /*
    ========================================
       1. РУХАЄМО BEFORE
    ========================================
    */

  beforeImage.style.clipPath = `inset(
            0
            ${100 - percentage}%
            0
            0
        )`;

  /*
    ========================================
       2. РУХАЄМО VERTICAL LINE
    ========================================
    */

  comparisonLine.style.left = `${percentage}%`;

  /*
    ========================================
       3. РУХАЄМО HANDLE
    ========================================
    */

  comparisonHandle.style.left = `${percentage}%`;
}

/* =========================================
   MOUSE / TOUCH START
========================================= */

comparison.addEventListener("pointerdown", function (event) {
  isDragging = true;

  comparison.setPointerCapture(event.pointerId);

  moveSlider(event.clientX);
});

/* =========================================
   MOUSE / TOUCH MOVE
========================================= */

comparison.addEventListener("pointermove", function (event) {
  if (!isDragging) {
    return;
  }

  moveSlider(event.clientX);
});

/* =========================================
   MOUSE / TOUCH END
========================================= */

comparison.addEventListener("pointerup", function (event) {
  isDragging = false;

  if (comparison.hasPointerCapture(event.pointerId)) {
    comparison.releasePointerCapture(event.pointerId);
  }
});

/* =========================================
   CANCEL
========================================= */

comparison.addEventListener("pointercancel", function () {
  isDragging = false;
});
