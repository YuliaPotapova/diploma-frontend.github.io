import { setIsClosed, removeIsClosed } from "../utils/utils.js";
import { Card } from "./Card.js";

// ====================================== Класс блока результатов ====================================
export class NewsCardList {
  constructor (
    mainResultsEl,
    resultContentEl, articlesListEl, showMoreBtnEl,
    resultLoadingEl,
    resultErrEl, resultInfoEl
  ) {
    this.mainResultsEl = mainResultsEl;
    this.resultContentEl = resultContentEl;
    this.articlesListEl = articlesListEl;
    this.showMoreBtnEl = showMoreBtnEl;
    this.resultLoadingEl = resultLoadingEl;
    this.resultErrEl = resultErrEl;
    this.resultInfoEl = resultInfoEl;
  }

  _init(mainApi, header) {
    this.mainApi = mainApi;
    this.header = header;

    this.cardsShown = 0;
    this.cards = [];
    setIsClosed([this.mainResultsEl]);
    this.showMoreBtnEl.addEventListener('click', this.showMoreCards.bind(this));
  }

  renderResults(cardsData) {
    this._clearCards();

    this.cardsShown = 0;
    this.cards = cardsData.map(el => new Card(el, this.mainApi, this.header, null));
    this.showMoreCards();

    if (this.cards.length > 0) {
      setIsClosed([this.resultLoadingEl, this.resultErrEl]);
      removeIsClosed([this.resultContentEl]);
    } else {
      this.resultInfoEl.textContent = "К сожалению, по вашему запросу<br>ничего не найдено.";
      setIsClosed([this.resultContentEl, this.resultLoadingEl]);
      removeIsClosed([this.resultErrEl]);
    }
    removeIsClosed([this.mainResultsEl]);
  }

  renderError(err) {
     if (err) this.resultInfoEl.textContent = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
    setIsClosed([this.resultContentEl, this.resultLoadingEl]);
    removeIsClosed([this.mainResultsEl, this.resultErrEl]);
  }

  renderLoader() {
    setIsClosed([this.resultContentEl, this.resultErrEl]);
    removeIsClosed([this.mainResultsEl, this.resultLoadingEl]);
  }

  showMoreCards() {
    for (let i = 0; i<3 && this.cardsShown<this.cards.length; i++) {
      const card = this.cards[this.cardsShown];
      this.articlesListEl.appendChild(card.createElement());
      this.cardsShown += 1;
    }
    this._showMoreButton();
  }

  updateCards() {
    this.cards.forEach((card) => card.updateIcon());
  }

  _clearCards() {
    while (this.articlesListEl.firstChild)
      this.articlesListEl.removeChild(this.articlesListEl.firstChild);
    this.cards.forEach((card) => card.removeEventListeners());
    this.cards = [];
  }

  _showMoreButton() {
    if (this.cards.length > this.cardsShown) {
      removeIsClosed([this.showMoreBtnEl]);
    } else {
      setIsClosed([this.showMoreBtnEl]);
    }
  }
}
