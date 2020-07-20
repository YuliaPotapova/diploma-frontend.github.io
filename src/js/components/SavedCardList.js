import { escapeHtml } from '../utils/utils';
import Card from './Card';

// ================================== Класс блока результатов ====================================
export default class SavedCardList {
  constructor(
    savedNewsTitle, savedNewsSubtitle,
    savedCardsEl, resultContentEl, articlesListEl,
  ) {
    this.savedNewsTitle = savedNewsTitle;
    this.savedNewsSubtitle = savedNewsSubtitle;
    this.savedCardsEl = savedCardsEl;
    this.resultContentEl = resultContentEl;
    this.articlesListEl = articlesListEl;
  }

  _init(mainApi, header) {
    this.mainApi = mainApi;
    this.header = header;
    this.cards = [];
  }

  renderResults(cardsData) {
    this._clearCards();

    const keywordMap = new Map();
    cardsData.forEach((el) => {
      const keyword = el.keyword.toLowerCase();
      if (keywordMap.has(keyword)) {
        keywordMap.set(keyword, keywordMap.get(keyword) + 1);
      } else {
        keywordMap.set(keyword, 1);
      }
    });

    cardsData.sort(
      (a, b) => keywordMap.get(b.keyword.toLowerCase()) - keywordMap.get(a.keyword.toLowerCase()),
    );

    this.cards = cardsData.map((cardData) => {
      const card = new Card(cardData, this.mainApi, this.header, this);
      this.articlesListEl.appendChild(card.createElement());
      return card;
    });

    this.updateTitle();
  }

  updateCards() {
    if (this.header.isLoggedIn()) {
      this.mainApi.getArticles()
        .then((res) => this.renderResults(res))
        .catch((err) => console.log('Ошибка в getArticles:', err));
    } else {
      window.location.href = '/index.html';
    }
  }

  updateTitle() {
    if (this.cards.length > 0) {
      this.savedNewsTitle.innerHTML = `${escapeHtml(this.header.getName())}, у вас ${this.cards.length}<br>сохранённых статей`;

      const keywords = [];
      this.cards.forEach((card) => {
        if (keywords.length === 0
            || keywords[keywords.length - 1].toLowerCase() !== card.data.keyword.toLowerCase()) {
          keywords.push(card.data.keyword);
        }
      });

      if (keywords.length > 3) {
        this.savedNewsSubtitle.innerHTML = `По ключевым словам: <b>${escapeHtml(keywords[0])}</b>, <b>${escapeHtml(keywords[1])}</b> и `
          + `<b>${keywords.length - 2} другим</b>`;
      } else {
        let first = true;
        let subtitle = 'По ключевым словам:';
        keywords.forEach((keyword) => {
          if (!first) subtitle += ',';
          subtitle += ` <b>${escapeHtml(keyword)}</b>`;
          first = false;
        });
        this.savedNewsSubtitle.innerHTML = subtitle;
      }
    } else {
      this.savedNewsTitle.innerHTML = `${escapeHtml(this.header.getName())}, у вас пока нет<br>сохранённых статей`;
      this.savedNewsSubtitle.innerHTML = '';
    }
  }

  removeCard(card) {
    card.removeEventListeners();
    this.articlesListEl.removeChild(card.cardElement);
    this.cards.splice(this.cards.indexOf(card), 1);
    this.updateTitle();
  }

  _clearCards() {
    while (this.articlesListEl.firstChild) {
      this.articlesListEl.removeChild(this.articlesListEl.firstChild);
    }
    this.cards.forEach((card) => card.removeEventListeners());
    this.cards = [];
  }
}
