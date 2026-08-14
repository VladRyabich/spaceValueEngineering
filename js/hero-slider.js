const comparison = document.getElementById("comparison");
const beforeImage = document.getElementById("beforeImage");
const comparisonLine = document.getElementById("comparisonLine");
const comparisonHandle = document.getElementById("comparisonHandle");

const labelBefore = comparison.querySelector(".comparison__label--before");
const labelAfter = comparison.querySelector(".comparison__label--after");

let isDragging = false;

/* =========================================
   MOVE SLIDER
========================================= */
function moveSlider(clientX) {
  const rect = comparison.getBoundingClientRect();
  let x = clientX - rect.left;
  x = Math.max(0, Math.min(x, rect.width));

  const percentage = (x / rect.width) * 100;

  /* 1. Рух картинки Before */
  beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;

  /* 2. Рух лінії та повзунка */
  comparisonLine.style.left = `${percentage}%`;
  comparisonHandle.style.left = `${percentage}%`;

  /* 3. ТОЧНЕ ЗНИКНЕННЯ БЕЙДЖІВ ПО РЕАЛЬНИХ КООРДИНАТАХ */
  if (labelBefore) {
    const beforeRect = labelBefore.getBoundingClientRect();
    const labelBeforeRightEdge = beforeRect.right - rect.left; // правий край бейджа BEFORE

    // Обрізаємо/ховаємо напис BEFORE тільки в той момент, коли лінія проходить крізь нього
    if (x <= labelBeforeRightEdge) {
      const cutFromRight = labelBeforeRightEdge - x;
      labelBefore.style.clipPath = `inset(0 ${cutFromRight}px 0 0)`;
    } else {
      labelBefore.style.clipPath = "none";
    }
  }

  if (labelAfter) {
    const afterRect = labelAfter.getBoundingClientRect();
    const labelAfterLeftEdge = afterRect.left - rect.left; // лівий край бейджа AFTER

    // Обрізаємо/ховаємо напис AFTER тільки коли лінія заходить на нього
    if (x >= labelAfterLeftEdge) {
      const cutFromLeft = x - labelAfterLeftEdge;
      labelAfter.style.clipPath = `inset(0 0 0 ${cutFromLeft}px)`;
    } else {
      labelAfter.style.clipPath = "none";
    }
  }
}

/* =========================================
   MOUSE / TOUCH EVENTS
========================================= */
comparison.addEventListener("pointerdown", function (event) {
  isDragging = true;
  comparison.setPointerCapture(event.pointerId);
  moveSlider(event.clientX);
});

comparison.addEventListener("pointermove", function (event) {
  if (!isDragging) return;
  moveSlider(event.clientX);
});

comparison.addEventListener("pointerup", function (event) {
  isDragging = false;
  if (comparison.hasPointerCapture(event.pointerId)) {
    comparison.releasePointerCapture(event.pointerId);
  }
});

comparison.addEventListener("pointercancel", function () {
  isDragging = false;
});