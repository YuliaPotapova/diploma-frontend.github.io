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
}
