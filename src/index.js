import { MainApi } from './js/api/MainApi.js';
import { Header } from './js/components/Header.js';
import { PopupSuccess } from './js/components/PopupSuccess.js';
import { PopupEntry } from './js/components/PopupEntry.js';
import { PopupRegistration } from './js/components/PopupRegistration.js';
import { Validator } from './js/components/Validator.js';
import { mainConfig, newsConfig } from './js/config.js';
import { NewsApi } from './js/api/NewsApi.js';
import { Search } from './js/components/Search.js';
import { NewsCardList } from './js/components/NewsCardList.js';

import './vendor/normalize.css';
import './index.css';


/* Постоянные - элементы разметки */

const headerEl = document.querySelector('.header');
const headerArticlesEl = headerEl.querySelector('.header__articles');
const headerButtonAuthEl = headerEl.querySelector('.header_button-auth');
const headerButtonLogOutEl = headerEl.querySelector('.header_button-log-out');
const headerButtonLogOutTextEl = headerEl.querySelector('.header__button-log-out-text');
const headerMobileMenuIconEl = document.querySelector('.header-mobile__menu-icon');
const menuPopupEl = document.querySelector('#menu-popup');
const menuPopupCloseIconEl = document.querySelector('.menu-popup__close-icon');
const headerMobileArticlesEl = menuPopupEl.querySelector('.header__articles');
const headerMobileButtonAuthEl = menuPopupEl.querySelector('.header_button-auth');
const headerMobileButtonLogOutEl = menuPopupEl.querySelector('.header_button-log-out');
const headerMobileButtonLogOutTextEl = menuPopupEl.querySelector('.header__button-log-out-text');

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

const mainResultsEl = document.querySelector('.main-results');
const resultContentEl = document.querySelector('.main-results__content');
const resultLoadingEl = document.querySelector('.main-results__loading');
const resultErrEl = document.querySelector('.main-results__not-found');
const resultInfoEl = resultErrEl.querySelector('.main-results__info-message');
const showMoreBtnEl = resultContentEl.querySelector('.main-results_button');
const articlesListEl = resultContentEl.querySelector('.articles-list');


/* Создание экземпляров классов */

const validator = new Validator();

const mainApi = new MainApi(mainConfig);
const newsApi  = new NewsApi(newsConfig);

const header = new Header(
  [headerArticlesEl, headerMobileArticlesEl],
  [headerButtonAuthEl, headerMobileButtonAuthEl],
  [headerButtonLogOutEl, headerMobileButtonLogOutEl],
  [headerButtonLogOutTextEl, headerMobileButtonLogOutTextEl],
  headerMobileMenuIconEl, menuPopupEl, menuPopupCloseIconEl);

const popupSuccess = new PopupSuccess(
  popupSuccessEl, popupSuccessCloseEl, successLinkToEntryEl, headerMobileMenuIconEl);

const popupEntry = new PopupEntry(
  validator, popupEntryEl, document.forms.entry,
  popupEntryCloseEl, popupEntrySubmitEnabledBtnEl, popupEntrySubmitDisabledBtnEl,
  popupEntryEmailErrorEl, popupEntryPasswordErrorEl, popupEntryApiErrorEl,
  popupLinkToRegistrationEl, headerMobileMenuIconEl);

const popupRegistration = new PopupRegistration(
  validator, popupRegistrationEl, document.forms.registration,
  popupRegistrationCloseEl, popupRegistrationSubmitEnabledBtnEl,
  popupRegistrationSubmitDisabledBtnEl, popupRegistrationEmailErrorEl,
  popupRegistrationPasswordErrorEl, popupRegistrationNameErrorEl,
  popupRegistrationApiErrorEl, popupLinkToEntryEl, headerMobileMenuIconEl);

const newsCardList = new NewsCardList(
  mainResultsEl, resultContentEl, articlesListEl, showMoreBtnEl, resultLoadingEl,
  resultErrEl, resultInfoEl);

const search = new Search(validator, searchInputEl, searchBtnEl);


/* Инициализация */

header._init(mainApi, popupEntry, newsCardList);
popupEntry._init(mainApi, header, popupRegistration);
popupRegistration._init(mainApi, popupSuccess, popupEntry);
popupSuccess._init(popupEntry);
newsCardList._init(mainApi, header);
search._init(newsApi, newsCardList);


/* Запуск */

header.update();
