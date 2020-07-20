import { mainConfig } from '../js/config';
import MainApi from '../js/api/MainApi';
import Header from '../js/components/Header';
import SavedCardList from '../js/components/SavedCardList';

import '../vendor/normalize.css';
import '../articles.css';

/* Постоянные - элементы разметки */

const headerEl = document.querySelector('.header');
const headerArticlesEl = headerEl.querySelector('.header__articles');
const headerButtonLogOutEl = headerEl.querySelector('.header_button-log-out');
const headerButtonLogOutTextEl = headerEl.querySelector('.header__button-log-out-text');
const headerMobileMenuIconEl = document.querySelector('.header-mobile__menu-icon');
const menuPopupEl = document.querySelector('#menu-popup');
const menuPopupCloseIconEl = document.querySelector('.menu-popup__close-icon');
const headerMobileArticlesEl = menuPopupEl.querySelector('.header__articles');
const headerMobileButtonLogOutEl = menuPopupEl.querySelector('.header_button-log-out');
const headerMobileButtonLogOutTextEl = menuPopupEl.querySelector('.header__button-log-out-text');

const savedNewsTitle = document.querySelector('.saved-news_title');
const savedNewsKeywords = document.querySelector('#keywords');

const savedCardsEl = document.querySelector('.saved-news-cards');
const savedCardsContentEl = document.querySelector('.saved-news-cards__content');
const articlesListEl = savedCardsContentEl.querySelector('.articles-list');

/* Создание экземпляров классов */

const mainApi = new MainApi(mainConfig);

const header = new Header(
  [headerArticlesEl, headerMobileArticlesEl],
  [],
  [headerButtonLogOutEl, headerMobileButtonLogOutEl],
  [headerButtonLogOutTextEl, headerMobileButtonLogOutTextEl],
  headerMobileMenuIconEl, menuPopupEl, menuPopupCloseIconEl,
);

const savedCardList = new SavedCardList(
  savedNewsTitle, savedNewsKeywords,
  savedCardsEl, savedCardsContentEl, articlesListEl,
);

/* Инициализация */

header._init(mainApi, undefined, savedCardList);
savedCardList._init(mainApi, header);

/* Запуск */

header.update();
