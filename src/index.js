import {getHeader} from './js/utils/utils.js';
import {MainApi} from './js/api/MainApi.js';
import {Popup} from './js/components/Popup.js';
import {PopupEntry} from './js/components/PopupEntry.js';
import {PopupRegistration} from './js/components/PopupRegistration.js';
import {Validator} from './js/components/Validator.js';
import {mainConfig, newConfig, newsConfig} from './js/config.js';
import './index.css';
import { NewsApi } from './js/api/NewsApi.js';

/* Константы */
const validatorErrors = {
  mandatoryField: 'Это обязательное поле',
  nameLength: 'Должно быть от 2 до 30 символов',
  mustBeEmail: 'Неправильный формат email',
  passwordLength: 'Должно быть не менее 8 символов'
}
const ud = undefined;

/* Постоянные - элементы разметки */
const popupEntryEl = document.querySelector('#popup-entry');
const popupRegistrationEl = document.querySelector('#popup-registration');
const popupSuccessEl = document.querySelector('#popup-success');
const popupEntryCloseEl = popupEntryEl.querySelector('.popup__close');
const popupRegistrationCloseEl = popupRegistrationEl.querySelector('.popup__close');
const popupSuccessCloseEl = popupSuccessEl.querySelector('.popup__close');
const popupEntrySubmitEnabledBtnEl = popupEntryEl.querySelector('.button_theme-blue');
const popupEntrySubmitDisabledBtnEl = popupEntryEl.querySelector('.button_not-active');
const popupRegistrationSubmitEnabledBtnEl = popupRegistrationEl.querySelector('.button_theme-blue');
const popupRegistrationSubmitDisabledBtnEl = popupRegistrationEl.querySelector('.button_not-active');
const popupEntryEmailErrorEl = popupEntryEl.querySelector('#error-entry_email');
const popupRegistrationEmailErrorEl = popupRegistrationEl.querySelector('#error-registration_email');
const popupEntryPasswordErrorEl = popupEntryEl.querySelector('#error-entry_password');
const popupRegistrationPasswordErrorEl = popupRegistrationEl.querySelector('#error-registration_password');
const popupRegistrationNameErrorEl = popupRegistrationEl.querySelector('#error-registration_name');
const popupEntryApiErrorEl = popupEntryEl.querySelector('.popup_api-error');
const popupRegistrationApiErrorEl = popupRegistrationEl.querySelector('.popup_api-error');
const popupLinkToRegistrationEl = popupEntryEl.querySelector('.popup__link');
const popupLinkToEntryEl = popupRegistrationEl.querySelector('.popup__link');
const successLinkToEntryEl = popupSuccessEl.querySelector('.popup__link');
const searchInputEl = document.querySelector('.search__input');
const searchBtnEl = document.querySelector('.search__button');

/* Создание экземпляров классов */
const mainApi = new MainApi(mainConfig);
const newsApi  = new NewsApi(newsConfig);
const validator = new Validator(validatorErrors);
const popupSuccess = new Popup(ud, popupSuccessEl, ud, popupSuccessCloseEl, ud, ud, ud, ud, ud, ud, ud, ud, ud, successLinkToEntryEl);
const popupEntry = new PopupEntry(mainApi, validator, popupEntryEl, document.forms.entry, popupEntryCloseEl, popupEntrySubmitEnabledBtnEl, popupEntrySubmitDisabledBtnEl, popupEntryEmailErrorEl, popupEntryPasswordErrorEl, popupEntryApiErrorEl, popupLinkToRegistrationEl);
const popupRegistration = new PopupRegistration(mainApi, validator, popupRegistrationEl, document.forms.registration, popupRegistrationCloseEl, popupRegistrationSubmitEnabledBtnEl, popupRegistrationSubmitDisabledBtnEl, popupRegistrationEmailErrorEl, popupRegistrationPasswordErrorEl, popupRegistrationNameErrorEl, popupRegistrationApiErrorEl, popupLinkToEntryEl);
const header = getHeader(document, mainApi, popupEntry);

header.update();

/* Слушатели событий */
header.setEventListeners();
popupEntry.setEventListeners(header, popupRegistration);
popupRegistration.setEventListeners(popupSuccess, popupEntry);
popupSuccess.setEventListeners(ud, popupEntry);
