// ================================= Класс запросов к нашему серверу ==================================
export class MainApi {
  constructor (config) {
    this.config = config;
  }

  // Регистрирует нового пользователя
  async signup(email, password, name) {
    const url = '/signup';
    const res = await this._request (url, 'POST', {email, password, name});
    if (res.ok) {
      const userData = await res.json();
      return { email: userData.email, userName: userData.name };
    }
    throw await res.json();
  }

  // Аутентифицирует пользователя на основе почты и пароля
  async signin(email, password) {
    const url = '/signin';
    const res = await this._request (url, 'POST', {email, password});
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
  getArticles() {
    const url = '/articles';
    return this._request (url, 'GET');
  }

  // Создаёт статью
  createArticle(keyword, title, text, date, source, link, image) {
    const url = '/articles';
    return this._request (url, 'POST', {keyword, title, text, date, source, link, image});
  }

  // Удаляет статью
  removeArticle(articleId) {
    const url = `/articles/${articleId}`;
    return this._request (url, 'DELETE');
  }

  _request (url, method, bodyDataObj) {
    return fetch(this.config.baseUrl + url, {
      method,
      headers: this.config.headers,
      body: bodyDataObj ? JSON.stringify(bodyDataObj) : undefined,
      credentials: 'include',
    })
  }
}