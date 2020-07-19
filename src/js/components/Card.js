import { escapeHtml } from "../utils/utils";

// ====================================== Класс блока результатов ====================================
export class Card {
  constructor (
    data,
    mainApi, newsApi, header
  ) {
    this.mainApi = mainApi;
    this.newsApi = newsApi;
    this.header = header;

    this.id = undefined
    this.data = data;
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

    this.iconEl = this.cardElement.querySelector('button');
    this.iconEl.addEventListener('click', this._saveOrDeleteCard.bind(this))

    this.updateIcon();
    return this.cardElement;
  }

  updateIcon() {
    if (!this.cardElement) return;
    if (this.header.isLoggedIn()) {
      if (this.id) {
        this.iconEl.classList = "article__bookmark-icon-marked";
      } else {
      this.iconEl.classList = "article__bookmark-icon-black";
      }
    } else {
      this.iconEl.classList = "article__bookmark-icon";
    }
  }

  _saveOrDeleteCard() {
    if (!this.header.isLoggedIn()) return;

    if (this.id) {
      this.mainApi.removeArticle(this.id)
      .then(res => {
        this.id = undefined;
        this.updateIcon();
      })
      .catch(err => {
        console.log("Ошибка в removeArticle:", err);
      })
    } else {
      this.mainApi.createArticle(
        this.data.keyword, this.data.title, this.data.description,
        this.data.publishedAt, this.data.source.name, this.data.url,
        this.data.urlToImage)
      .then(res => {
        this.id = res._id;
        this.updateIcon();
      })
      .catch(err => {
        console.log("Ошибка в createArticle:", err);
      });
    }
  }

  _formatDate(date) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
      'сентября', 'октября', 'ноября', 'декабря'];
    return date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear();
  }
}