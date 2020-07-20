import Popup from './Popup';
import { removeIsInvisible } from '../utils/utils';

// ====================== Расширенный класс для всплывающего окна #popup-entry =====================
export default class PopupEntry extends Popup {
  constructor(
    validator,
    popupEl, formEl,
    closeBtnEl, submitEnabledBtnEl, submitDisabledBtnEl,
    emailErrorEl, passwordErrorEl,
    apiErrorEl,
    linkToRegistrationEl,
    headerMobileMenuIconEl,
  ) {
    super(
      validator,
      popupEl, formEl,
      closeBtnEl, submitEnabledBtnEl, submitDisabledBtnEl,
      undefined, undefined,
      formEl.elements.entry_email, emailErrorEl,
      formEl.elements.entry_password, passwordErrorEl,
      apiErrorEl,
      linkToRegistrationEl,
      headerMobileMenuIconEl,
    );
  }

  _init(mainApi, header, popupRegistration) {
    this.mainApi = mainApi;
    this.setEventListeners(header, popupRegistration);
  }

  async submit(header) {
    this.submitted = true;
    if (this._validateForm()) {
      const email = this.emailInputEl.value;
      const password = this.passwordInputEl.value;
      this.mainApi.signin(email, password)
        .then(() => {
          header.update();
          this.close();
        })
        .catch((err) => {
          this.apiErrorEl.textContent = err.message;
          removeIsInvisible([this.apiErrorEl]);
        });
    }
  }
}
