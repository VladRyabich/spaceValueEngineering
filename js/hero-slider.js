/* ========================================= ELEMENTS ========================================= */

const comparison = document.getElementById("comparison");

const beforeImage = document.getElementById("beforeImage");

const divider = document.getElementById("divider");

const handle = document.getElementById("handle");

/* ========================================= STATE ========================================= */

let isDragging = false;

/* ========================================= UPDATE SLIDER ========================================= */

function updateSlider(clientX) {
  const rect = comparison.getBoundingClientRect();

  /* X відносно slider */

  let x = clientX - rect.left;

  /* Не дозволяємо вийти за межі */

  x = Math.max(0, Math.min(x, rect.width));

  /* PX → % */

  const percentage = (x / rect.width) * 100;

  /* BEFORE */

  beforeImage.style.clipPath = `inset(
                    0
                    ${100 - percentage}%
                    0
                    0
                )`;

  /* LINE */

  divider.style.left = `${percentage}%`;

  /* HANDLE */

  handle.style.left = `${percentage}%`;
}

/* ========================================= POINTER DOWN ========================================= */

comparison.addEventListener("pointerdown", function (event) {
  isDragging = true;

  comparison.classList.add("dragging");

  /* Захоплюємо pointer.
    Це дуже важливо для телефону:
    можна вести пальцем навіть
    якщо він трохи виходить
    за межі slider. */

  comparison.setPointerCapture(event.pointerId);

  updateSlider(event.clientX);
});

/* ========================================= POINTER MOVE ========================================= */

comparison.addEventListener("pointermove", function (event) {
  if (!isDragging) {
    return;
  }

  updateSlider(event.clientX);
});

/* ========================================= POINTER UP ========================================= */

comparison.addEventListener("pointerup", function (event) {
  isDragging = false;

  comparison.classList.remove("dragging");

  /* Відпускаємо pointer */

  if (comparison.hasPointerCapture(event.pointerId)) {
    comparison.releasePointerCapture(event.pointerId);
  }
});

/* ========================================= POINTER CANCEL ========================================= */

comparison.addEventListener("pointercancel", function () {
  isDragging = false;

  comparison.classList.remove("dragging");
});
