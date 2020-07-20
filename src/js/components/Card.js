import { escapeHtml, formatCardDate } from '../utils/utils';

// ===================================== Класс блока результатов ===================================
export default class Card {
  constructor(
    data,
    mainApi, header, cardList,
  ) {
    this.mainApi = mainApi;
    this.header = header;
    this.cardList = cardList;

    this.id = data._id;
    this.data = data;

    this.saved = data._id !== undefined;
  }

  // Создаёт элемент карточки и возвращает его
  createElement() {
    const d = this.data;
    const keywordElement = this.saved ? `<span class="article__category">${escapeHtml(d.keyword)}</span>` : '';
    const template = `<div class="article">
                        <div class="article__image" style="background-image: url(${d.urlToImage})">
                          <button class="article__trash-icon"></button>
                        </div>
                        ${keywordElement}
                        <span class="article__date">${formatCardDate(new Date(d.publishedAt))}</span>
                        <h3 class="article__title">${escapeHtml(d.title)}</h3>
                        <p class="article__text">${escapeHtml(d.description)}</p>
                        <span class="article__source">${escapeHtml(d.source.name)}</span>
                      </div>`;

    const cardElement = document.createElement('div');
    cardElement.insertAdjacentHTML('beforeend', template);
    this.cardElement = cardElement.firstChild;

    this.iconEl = this.cardElement.querySelector('button');
    this.cardElement.addEventListener('click', (e) => {
      if (e.target !== this.iconEl) window.open(this.data.url);
    });
    this.iconEl.addEventListener('click', this._saveOrDeleteCard.bind(this));

    this.updateIcon();
    return this.cardElement;
  }

  updateIcon() {
    if (this.saved || !this.cardElement) return;
    if (this.header.isLoggedIn()) {
      if (this.id) {
        this.iconEl.classList = 'article__bookmark-icon-marked';
      } else {
        this.iconEl.classList = 'article__bookmark-icon-black';
      }
    } else {
      this.iconEl.classList = 'article__bookmark-icon';
    }
  }

  removeEventListeners() {
    if (!this.cardElement) return;
    this.cardElement.removeEventListener('click', () => { window.open(this.data.url, this.data.title); });
    this.cardElement.querySelector('button').removeEventListener('click', this._saveOrDeleteCard.bind(this));
  }

  _saveOrDeleteCard() {
    if (!this.header.isLoggedIn()) return;
    if (this.id) {
      this.mainApi.removeArticle(this.id)
        .then(() => {
          this.id = undefined;
          if (this.saved) {
            this.cardList.removeCard(this);
          } else {
            this.updateIcon();
          }
        })
        .catch((err) => {
          console.log('Ошибка в removeArticle:', err);
        });
    } else {
      this.mainApi.createArticle(
        this.data.keyword, this.data.title, this.data.description,
        this.data.publishedAt, this.data.source.name, this.data.url,
        this.data.urlToImage,
      )
        .then((res) => {
          this.id = res._id;
          this.updateIcon();
        })
        .catch((err) => {
          console.log('Ошибка в createArticle:', err);
        });
    }
  }
}
