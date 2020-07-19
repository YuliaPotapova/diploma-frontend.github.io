// ================================= Класс запросов к нашему серверу ==================================
export class MainApi {
  constructor (config) {
    this.config = config;
  }

  // Регистрирует нового пользователя
  async signup(email, password, name) {
    const res = await this._request ('/signup', 'POST', {email, password, name});
    if (res.ok) {
      const userData = await res.json();
      return { email: userData.email, userName: userData.name };
    }
    throw await res.json();
  }

  // Аутентифицирует пользователя на основе почты и пароля
  async signin(email, password) {
    const res = await this._request ('/signin', 'POST', {email, password});
    if (res.ok)
      return true;
    throw await res.json();
  }

  // Удаляет авторизацию пользователя
  async signout() {
    const res = await this._request ('/users/signout', 'POST');
    if (res.ok)
      return true;
    throw await res.json();
  }

  // Возвращает информацию о пользователе
  async getUserData() {
    const res = await this._request('/users/me', 'GET');
    if (res.ok) {
      const userData = await res.json();
      return { isLoggedIn: true, userName: userData.name };
    } else if (res.status === 401) {
      return { isLoggedIn: false, userName: undefined };
    }
    throw await res.json();
  }

  // Забирает все статьи
  async getArticles() {
    const res = await this._request ('/articles', 'GET');
    if (res.ok) {
      const articles = await res.json();
      return articles.map((a) => { return {
        _id: a._id,
        keyword: a.keyword,
        title: a.title,
        description: a.text,
        url: a.link,
        urlToImage: a.image,
        publishedAt: a.date,
        source: { name: a.source },
      };})
    }
    throw await res.json();
  }

  // Создаёт статью
  async createArticle(keyword, title, text, date, source, link, image) {
    const res = await this._request ('/articles', 'POST', {keyword, title, text, date, source, link, image});
    if (res.ok)
      return await res.json();
    throw await res.json();
  }

  // Удаляет статью
  async removeArticle(articleId) {
    const res = await this._request (`/articles/${articleId}`, 'DELETE');
    if (res.ok)
      return await res.json();
    throw await res.json();
  }

  _request (url, method, bodyDataObj) {
    return fetch(this.config.baseUrl + url, {
      method,
      headers: this.config.headers,
      body: bodyDataObj ? JSON.stringify(bodyDataObj) : undefined,
      credentials: 'include',
    });
  }
}