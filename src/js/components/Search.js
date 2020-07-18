// ================================== Класс для блока поиска новостей ================================
export class Search {
  constructor (validator, searchInputEl, searchBtnEl) {
    this.validator = validator;
    this.searchInputEl = searchInputEl;
    this.searchBtnEl = searchBtnEl;
  }

  _init(newsApi, newsCardList) {
    this.newsApi = newsApi;
    this.newsCardList = newsCardList;

    this.searchBtnEl.addEventListener('click', this.submit.bind(this));
  }

  _validteInput() {
    const err = this.validator.checkKeyword(this.searchInputEl);
    if (err) {
      this.searchInputEl.placeholder = err;
      return false;
    } else {
      this.searchInputEl.placeholder = "Введите тему новости";
      return true;
    }
  }

  async submit() {
    if (this._validteInput()) {
      const word = this.searchInputEl.value;
      this.newsCardList.renderLoader();
      this.newsApi.getNews(word)
        .then((res) => {
          this.newsCardList.renderResults(res);
        })
        .catch((err) => {
          this.newsCardList.renderError(err);
        });
    }
  }
}