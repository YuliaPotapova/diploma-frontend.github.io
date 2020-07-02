const presets = [
  [
    "@babel/env",
    {
      targets: [ // указать цели, для полифилов
        "last 2 Chrome versions",
        "last 2 ChromeAndroid versions",
        "last 2 Firefox versions",
        "last 2 Safari versions",
        "Edge >= 15"
      ],
      useBuiltIns: "usage", // эта настройка babel-polyfill, если стоит значение usage, то будут подставлятся полифилы для версий браузеров которые указали выше.
      corejs: "3.4.1" // явно проставить версию corejs
    }
  ]
];
module.exports = { presets };