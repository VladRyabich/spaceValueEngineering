(() => {
  const refs = {
    openModalBtns: document.querySelectorAll("[data-modal-open]"),
    mobileEmail: document.querySelector("[data-mobile-modal]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
    menu: document.querySelector("[data-menu]"),
    form: document.querySelector("#form"),
  };

  // Кнопки відкриття модалки на планшеті та ПК
  if (refs.openModalBtns.length) {
    refs.openModalBtns.forEach((btn) => {
      btn.addEventListener("click", toggleModal);
    });
  }

  // Email на мобільному
  if (refs.mobileEmail) {
    refs.mobileEmail.addEventListener("click", (event) => {
      if (window.innerWidth <= 767) {
        // Забороняємо mailto
        event.preventDefault();

        // Не даємо menu.js обробити цей клік
        event.stopPropagation();

        // Закриваємо мобільне меню
        if (refs.menu) {
          refs.menu.classList.remove("is_open");
        }

        // Відкриваємо модалку
        refs.modal.classList.add("is_open");
      }
    });
  }

  // Закриття модалки
  if (refs.closeModalBtn) {
    refs.closeModalBtn.addEventListener("click", toggleModal);
  }

  // Функція для маски/форматування канадського номера
  function formatCanadianPhone(value) {
    // Очищаємо від усього, крім цифр
    let digits = value.replace(/\D/g, "");

    // Якщо поле порожнє
    if (!digits) return "";

    // Якщо перша цифра 1 (код країни), видаляємо її
    if (digits.startsWith("1")) {
      digits = digits.substring(1);
    }

    // Обмежуємо 10 цифрами
    digits = digits.substring(0, 10);

    // Якщо після видалення 1 нічого не залишилося
    if (digits.length === 0) return "";

    // Форматування залежно від довжини
    if (digits.length <= 3) {
      return `+1 (${digits}`;
    }

    if (digits.length <= 6) {
      return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }

  // Кастомні повідомлення валідації форми
  if (refs.form) {
    refs.form.addEventListener(
      "invalid",
      (event) => {
        const input = event.target;

        if (input.id === "user-name") {
          if (input.validity.valueMissing) {
            input.setCustomValidity("Please enter your name");
          } else if (input.validity.patternMismatch) {
            input.setCustomValidity(
              "Please enter your name using English letters only",
            );
          }
        }

        if (input.id === "user-email") {
          if (input.validity.valueMissing) {
            input.setCustomValidity("Please enter your email");
          } else if (input.validity.typeMismatch) {
            input.setCustomValidity("Please enter a valid email");
          }
        }

        if (input.id === "user-phone") {
          if (input.validity.valueMissing) {
            input.setCustomValidity("Please enter your Canadian phone number");
          } else if (input.validity.patternMismatch) {
            input.setCustomValidity(
              "Please enter a valid 10-digit Canadian phone number, e.g. +1 (416) 519-9332",
            );
          }
        }

        if (input.id === "user-comment") {
          input.setCustomValidity("Please enter your comment");
        }

        if (input.id === "privacy-policy") {
          input.setCustomValidity("Please accept the privacy policy");
        }
      },
      true,
    );

    // Обробка введення тексту
    refs.form.addEventListener("input", (event) => {
      const input = event.target;

      // Тільки англійські літери для імені
      if (input.id === "user-name") {
        input.value = input.value.replace(/[^a-zA-Z\s'-]/g, "");
      }

      // Автоматичне форматування канадського номера
      if (input.id === "user-phone") {
        input.value = formatCanadianPhone(input.value);
      }

      input.setCustomValidity("");
    });

    // Для checkbox
    refs.form.addEventListener("change", (event) => {
      event.target.setCustomValidity("");
    });
  }

  function toggleModal() {
    refs.modal.classList.toggle("is_open");
  }
})();
