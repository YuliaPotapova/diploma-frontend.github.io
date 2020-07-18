// ================================== Класс для блока поиска новостей ================================
export class Search {
  constructor (searchInputEl, searchBtnEl, newsApi, newsCardList) {
    this.searchInputEl = searchInputEl;
    this.searchBtnEl = searchBtnEl;
    this.newsApi = newsApi;
    this.newsCardList = newsCardList;
  }

  _validator() {
    if (this.searchInputEl.value.length === 0) {
      this.searchInputEl.placeholder = "Нужно ввести ключевое слово";
      return false;
    } else {
      return true;
    }
  }

  async submit() {
    if (this._validator()) {
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

  setEventListeners() {
    this.searchBtnEl.addEventListener('click', this.submit.bind(this));
  }