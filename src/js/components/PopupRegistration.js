import {Popup} from './Popup.js';
import { removeIsInvisible } from "../utils/utils.js";

// =========================== Расширенный класс для всплывающего окна #popup-registration ============================
export class PopupRegistration extends Popup {
  constructor(
    validator,
    popupEl, formEl,
    closeBtnEl, submitEnabledBtnEl, submitDisabledBtnEl,
    emailErrorEl, passwordErrorEl, nameErrorEl,
    apiErrorEl,
    linkToEntryEl
  ) {
    super(
      validator,
      popupEl, formEl,
      closeBtnEl, submitEnabledBtnEl, submitDisabledBtnEl,
      formEl.elements.registration_name, nameErrorEl,
      formEl.elements.registration_email, emailErrorEl,
      formEl.elements.registration_password, passwordErrorEl,
      apiErrorEl,
      linkToEntryEl
    );
  }

  _init(mainApi, popupSuccess, popupEntry) {
    this.mainApi = mainApi;
    this.setEventListeners(popupSuccess, popupEntry);
  }

  async submit(popupSuccess) {
    if (this._validateForm()) {
      const email = this.emailInputEl.value;
      const password = this.passwordInputEl.value;
      const name = this.nameInputEl.value;
      // renderLoading(this.form.elements.submit, 'Зарегистрироваться', '···', true);
      this.mainApi.signup(email, password, name)
      .then(() => {
        this.close();
        popupSuccess.open();
      })
      .catch(err => {
        this.apiErrorEl.textContent = err.message;
        removeIsInvisible([this.apiErrorEl]);
        // console.log(err.message);
      });
      // await this.sleep(2000);
      // renderLoading(this.form.elements.submit, 'Зарегистрироваться', '···', false);
    }
  }
}