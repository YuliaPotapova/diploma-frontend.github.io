// ==================================== Класс для валидации формы ============================================
export class Validator {
  constructor(errors) {
    this.errors = {
      mandatoryField: 'Это обязательное поле',
      nameLength: 'Должно быть от 2 до 30 символов',
      mustBeEmail: 'Неправильный формат email',
      passwordLength: 'Должно быть не менее 8 символов',
      keywordRequired: 'Нужно ввести ключевое слово',
    };
  }

  checkName(inputEl) {
    if (inputEl.value.length === 0) return this.errors.mandatoryField;
    if (inputEl.value.length === 1 || inputEl.value.length > 30) return this.errors.nameLength;
    return undefined;
  }

  checkEmail(inputEl) {
    if (inputEl.value.length === 0) return this.errors.mandatoryField;
    if (inputEl.validity.typeMismatch) return this.errors.mustBeEmail;
    return undefined;
  }

  checkPassword(inputEl) {
    if (inputEl.value.length === 0) return this.errors.mandatoryField;
    if (inputEl.value.length > 0 && inputEl.value.length < 8) return this.errors.passwordLength;
    return undefined;
  }

  checkKeyword(inputEl) {
    if (inputEl.value.length === 0) return this.errors.keywordRequired;
    return undefined;
  }

  // Метод валидации поля
  // checkInputValidity(inputElement) {
  //   const len = inputElement.value.length;
  //   const errorElement = document.querySelector(`#error-${inputElement.name}`);
  //   if (len === 0) {
  //     errorElement.textContent = this.errors.mandatoryField;
  //     // removeIsInvisible([errorElement]);
  //     return false;
  //   }
  //   if (inputElement.name === 'registration-name' && (len === 1 || len > 30)) {
  //     errorElement.textContent = this.errors.nameLenght;
  //     removeIsInvisible([errorElement]);
  //     return false;
  //   }
  //   if (inputElement.name.includes('password') && len < 8) {
  //     errorElement.textContent = this.errors.passwordLenght;
  //     removeIsInvisible([errorElement]);
  //     return false;
  //   }
  //   if (inputElement.name.includes('email') && inputElement.validity.typeMismatch) {
  //     errorElement.textContent = this.errors.mustBeEmail;
  //     removeIsInvisible([errorElement]);
  //     return false;
  //   }
  //   setIsInvisible([errorElement]);
  //   return true;
  // }

  // Метод валидации формы
  // checkFormValidity(form) {
  //   const inputs = Array.from(form.querySelectorAll('.popup__input'));
  //   let isValid = true;
  //   inputs.forEach(el => {
  //     if (!this.checkInputValidity(el)) isValid = false;
  //   })
  //   return isValid;
  // }

  // Метод экранирования данных, вводимых пользователем (для insertAdjacentHTML)
  // escapeHtml(string) {
  //   const entityMap = {
  //     '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  //     '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
  //   };
  //   return String(string).replace(/[&<>"'`=/]/g, (s) => entityMap[s]);
  // }

  // Метод, меняющий состояние кнопки сабмита
  // setSubmitButtonState(form) {
  //   const formValid = this.checkFormValidity(form);
  //   const btnNotActive = form.querySelector('.button_not-active');
  //   const btnActive = form.querySelector('.button_theme-blue');
  //   if (formValid) {
  //     removeIsClosed ([btnActive]);
  //     setIsClosed ([btnNotActive]);
  //   } else {
  //     removeIsClosed ([btnNotActive]);
  //     setIsClosed ([btnActive]);
  //   }
  // }

  // Метод добавления обработчиков
  // setEventListeners(popup) {
  //   const popupClose = popup.popupEl.querySelector('.popup__close');
  //   popupClose.addEventListener('click', popup.close.bind(popup));

  //   const form = popup.popupEl.querySelector('.popup__form');
  //   if (form !== null) {
  //     form.addEventListener('input', (e) => { e.preventDefault(); this.setSubmitButtonState(form); });
  //     form.addEventListener('submit', (e) => { e.preventDefault(); popup.submit.call(popup); });
  //   }
  // }
}
