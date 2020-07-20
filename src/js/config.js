const mainConfig = {
  baseUrl: 'https://api.jslife.tk',
  headers: {
    'Content-Type': 'application/json',
  },
};

const newsConfig = {
  baseUrl: 'https://praktikum.tk/news',
  apiKey: '48abbbd13ffd48f086ebd6816015bab4',
  pageSize: 100,
  days: 7,
};

export { mainConfig, newsConfig };
