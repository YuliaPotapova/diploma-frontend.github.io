// ================================ Класс для валидации формы ======================================
export default class Validator {
  constructor() {
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
    const regex = /^([A-Za-z0-9]+[-_.])*[A-Za-z0-9]+@([A-Za-z0-9]+[-_.])*[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
    if (!regex.test(inputEl.value)) return this.errors.mustBeEmail;
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
