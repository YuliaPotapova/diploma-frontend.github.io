import { setIsInvisible, removeIsInvisible, setIsClosed, removeIsClosed } from "../utils/utils";

// =================================== Класс для всплывающего окна ===========================================
export class Popup {
  constructor(
    validator,
    popupEl, formEl,
    closeBtnEl, submitEnabledBtnEl, submitDisabledBtnEl,
    nameInputEl, nameErrorEl,
    emailInputEl, emailErrorEl,
    passwordInputEl, passwordErrorEl,
    apiErrorEl,
    linkEl
  ) {
    this.validator = validator;
    this.popupEl = popupEl;
    this.formEl = formEl;
    this.closeBtnEl = closeBtnEl;
    this.submitEnabledBtnEl = submitEnabledBtnEl;
    this.submitDisabledBtnEl = submitDisabledBtnEl;
    this.nameInputEl = nameInputEl;
    this.nameErrorEl = nameErrorEl;
    this.emailInputEl = emailInputEl;
    this.emailErrorEl = emailErrorEl;
    this.passwordInputEl = passwordInputEl;
    this.passwordErrorEl = passwordErrorEl;
    this.apiErrorEl = apiErrorEl;
    this.linkEl = linkEl;
  }

  open() {
    if (this.formEl) {
      this.formEl.reset();
      this._validateForm();
      setIsInvisible([this.apiErrorEl]);
    }
    removeIsClosed([this.popupEl]);
  }

  close() {
    setIsClosed([this.popupEl]);
  }

  submit() {
    this.close();
  }

  _validateInputElement(inputEl) {
    if (!this.validator || !inputEl) return true;

    let err = undefined;
    let errEl = undefined;
    if (inputEl === this.nameInputEl) {
      err = this.validator.checkName(inputEl);
      errEl = this.nameErrorEl;
    } else if (inputEl === this.emailInputEl) {
      err = this.validator.checkEmail(inputEl);
      errEl = this.emailErrorEl;
    } else if (inputEl === this.passwordInputEl) {
      err = this.validator.checkPassword(inputEl);
      errEl = this.passwordErrorEl;
    }

    if (err) {
      errEl.textContent = err;
      removeIsInvisible([errEl]);
      return false;
    } else {
      setIsInvisible([errEl]);
      return true;
    }
  }

  _validateForm() {
    const nameValid = this._validateInputElement(this.nameInputEl);
    const emailValid = this._validateInputElement(this.emailInputEl);
    const passwordValid = this._validateInputElement(this.passwordInputEl);
    if (!nameValid || !emailValid || !passwordValid) {
      setIsClosed([this.submitEnabledBtnEl]);
      removeIsClosed([this.submitDisabledBtnEl]);
      return false;
    } else {
      setIsClosed([this.submitDisabledBtnEl]);
      removeIsClosed([this.submitEnabledBtnEl]);
      return true;
    }
  }

  setEventListeners(submitObj, popupToOpen) {
    this.closeBtnEl.addEventListener('click', this.close.bind(this));
    if (this.formEl) {
      this.formEl.addEventListener('input', (e) => { e.preventDefault(); this._validateForm.call(this); });
      this.formEl.addEventListener('submit', (e) => { e.preventDefault(); this.submit.call(this, submitObj); });
    }
    this.linkEl.addEventListener('click', () => { this.close(); popupToOpen.open(); });
  }
}