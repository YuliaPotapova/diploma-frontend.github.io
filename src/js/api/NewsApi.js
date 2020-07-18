// ================================= Класс запросов к newsapi.org ==================================
export class NewsApi {
  constructor (config) {
    this.config = config;
  }

  getNews(word) {
    let date = new Date()
    date.setDate(date.getDate() - this.config.days);

    const query = new URLSearchParams({
      q: word,
      apiKey: this.config.apiKey,
      from: date.toISOString().substr(0,10),
      to: (new Date()).toISOString().substr(0,10),
      pageSize: this.config.pageSize,
    })

    return fetch(this.config.baseUrl + "/v2/everything?" + query.toString())
    .then(res => res.json())
    .then(data => {
      data.articles.forEach(el => el.keyword = word)
      return data.articles;
    });
  }
}