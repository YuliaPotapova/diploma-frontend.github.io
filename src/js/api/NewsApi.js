// ================================= Класс запросов к newsapi.org ==================================
export default class NewsApi {
  constructor(config) {
    this.config = config;
  }

  getNews(word) {
    const date = new Date();
    date.setDate(date.getDate() - this.config.days);

    const query = new URLSearchParams({
      q: word,
      apiKey: this.config.apiKey,
      from: date.toISOString().substr(0, 10),
      to: (new Date()).toISOString().substr(0, 10),
      pageSize: this.config.pageSize,
    });

    return fetch(`${this.config.baseUrl}/v2/everything?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        // eslint-disable-next-line no-param-reassign
        data.articles.forEach((el) => { el.keyword = word; });
        return data.articles;
      })
      .catch(() => {
        throw new Error('Сервер временно недоступен');
      });
  }
}
