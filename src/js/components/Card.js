import { escapeHtml } from "../utils/utils";

// ====================================== Класс блока результатов ====================================
export class Card {
  constructor (
    data,
    mainApi, newsApi, header
  ) {
    this.data = data;
    this.mainApi = mainApi;
    this.newsApi = newsApi;
    this.header = header;
  }

  // Создаёт элемент карточки и возвращает его
  createElement() {
    const d = this.data

    const template =
            `<div class="article">
              <div class="article__image" style="background-image: url(${d.urlToImage})">
                <button class="article__bookmark-icon"></button>
              </div>
              <span class="article__date">${this._formatDate(new Date(d.publishedAt))}</span>
              <h3 class="article__title">${escapeHtml(d.title)}</h3>
              <p class="article__text">${escapeHtml(d.description)}</p>
              <span class="article__source">${escapeHtml(d.source.name)}</span>
            </div>`

    const cardElement = document.createElement('div');
    cardElement.insertAdjacentHTML('beforeend', template);
    this.cardElement = cardElement.firstChild;

    this.updateIcon();
    return this.cardElement;
  }

  updateIcon() {

  }

  _formatDate(date) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
      'сентября', 'октября', 'ноября', 'декабря'];
    return date.getDay() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear();
  }
}