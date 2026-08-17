(() => {
  const refs = {
    // Шукаємо всі кнопки/посилання відкриття (якщо додасте посилання у футер тощо)
    openModalBtns: document.querySelectorAll("[data-privacy-open]"),
    closeModalBtn: document.querySelector("[data-privacy-close]"),
    modal: document.querySelector("[data-privacy-modal]"),
  };

  if (!refs.modal) return;

  // Відкриття
  refs.openModalBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault(); // Запобігає стрибку скролу від <a href="#">
      openPrivacyModal();
    });
  });

  // Закриття по кнопці
  if (refs.closeModalBtn) {
    refs.closeModalBtn.addEventListener("click", closePrivacyModal);
  }

  // Закриття по кліку на фон (бекдроп)
  refs.modal.addEventListener("click", (event) => {
    if (event.target === refs.modal) {
      closePrivacyModal();
    }
  });

  function openPrivacyModal() {
    refs.modal.classList.add("is_open");
    window.addEventListener("keydown", onEscKeyPress);
  }

  function closePrivacyModal() {
    refs.modal.classList.remove("is_open");
    window.removeEventListener("keydown", onEscKeyPress);
  }

  function onEscKeyPress(event) {
    if (event.code === "Escape") {
      closePrivacyModal();
    }
  }
})();
