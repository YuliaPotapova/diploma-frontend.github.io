import Popup from './Popup';
import { removeIsInvisible } from '../utils/utils';

// ================== Расширенный класс для всплывающего окна #popup-registration ==================
export default class PopupRegistration extends Popup {
  constructor(
    validator,
    popupEl, formEl,
    closeBtnEl, submitEnabledBtnEl, submitDisabledBtnEl,
    emailErrorEl, passwordErrorEl, nameErrorEl,
    apiErrorEl,
    linkToEntryEl,
    headerMobileMenuIconEl,
  ) {
    super(
      validator,
      popupEl, formEl,
      closeBtnEl, submitEnabledBtnEl, submitDisabledBtnEl,
      formEl.elements.registration_name, nameErrorEl,
      formEl.elements.registration_email, emailErrorEl,
      formEl.elements.registration_password, passwordErrorEl,
      apiErrorEl,
      linkToEntryEl,
      headerMobileMenuIconEl,
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
      this.mainApi.signup(email, password, name)
        .then(() => {
          this.close();
          popupSuccess.open();
        })
        .catch((err) => {
          this.apiErrorEl.textContent = err.message;
          removeIsInvisible([this.apiErrorEl]);
        });
    }
  }
}
