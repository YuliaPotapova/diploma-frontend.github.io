import {Header} from '../components/Header.js';

export function setIsClosed (elementsArray) {
  elementsArray.forEach(el => {
    if (!Array.from(el.classList).includes('is-closed')) el.classList.add('is-closed');
  })
}

export function removeIsClosed (elementsArray) {
  elementsArray.forEach(el => {
    if (Array.from(el.classList).includes('is-closed')) el.classList.remove('is-closed');
  })
}

export function setIsInvisible (elementsArray) {
  elementsArray.forEach(el => {
    if (el && !Array.from(el.classList).includes('is-invisible')) el.classList.add('is-invisible');
  })
}

export function removeIsInvisible (elementsArray) {
  elementsArray.forEach(el => {
    if (el && Array.from(el.classList).includes('is-invisible')) el.classList.remove('is-invisible');
  })
}

export function getHeader(document, mainApi, popupEntry) {
  const headerEl = document.querySelector('.header');
  const headerArticlesEl = headerEl.querySelector('.header__articles');
  const headerButtonAuthEl = headerEl.querySelector('.header_button-auth');
  const headerButtonLogOutEl = headerEl.querySelector('.header_button-log-out');
  const headerButtonLogOutTextEl = headerEl.querySelector('.header__button-log-out-text');
  const menuPopupEl = document.querySelector('#menu-popup');
  const headerMobileArticlesEl = menuPopupEl.querySelector('.header__articles');
  const headerMobileButtonAuthEl = menuPopupEl.querySelector('.header_button-auth');
  const headerMobileButtonLogOutEl = menuPopupEl.querySelector('.header_button-log-out');
  const headerMobileButtonLogOutTextEl = menuPopupEl.querySelector('.header__button-log-out-text');

  return new Header(
    [headerArticlesEl,headerMobileArticlesEl],
    [headerButtonAuthEl,headerMobileButtonAuthEl],
    [headerButtonLogOutEl,headerMobileButtonLogOutEl],
    [headerButtonLogOutTextEl,headerMobileButtonLogOutTextEl],
    mainApi, popupEntry);
}
