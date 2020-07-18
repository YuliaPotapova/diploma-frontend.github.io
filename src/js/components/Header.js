import {setIsClosed, removeIsClosed} from '../utils/utils.js';
import { Card } from './Card.js';

// =================================== Класс для шапки сайта =========================================
export class Header {
  constructor(savedArticlesElArr, buttonAuthElArr, buttonLogOutElArr, userNamesElArr) {
    this.savedArticlesElArr = savedArticlesElArr;
    this.buttonAuthElArr = buttonAuthElArr;
    this.buttonLogOutElArr = buttonLogOutElArr;
    this.userNamesArr = userNamesElArr;

    this.loggedIn = false;
  }

  _init(mainApi, popupEntry) {
    this.mainApi = mainApi;

    this.buttonAuthElArr.forEach(el => {
      el.addEventListener('click', () => popupEntry.open());
    });
    // this.buttonLogOutElArr.forEach(el => {
    //   el.addEventListener('click', () => this.render({ isLoggedIn: false, userName: undefined }));
    // });

    this.render({isLoggedIn: false});
  }

  isLoggedIn() {
    return this.isLoggedIn;
  }

  render(props) {
    if (props.isLoggedIn) {
      this.userNamesArr.forEach(el => {
        el.textContent = props.userName;
      });
      removeIsClosed(this.savedArticlesElArr);
      setIsClosed(this.buttonAuthElArr);
      removeIsClosed(this.buttonLogOutElArr);
    } else {
      setIsClosed(this.savedArticlesElArr);
      removeIsClosed(this.buttonAuthElArr);
      setIsClosed(this.buttonLogOutElArr);
    }
    this.loggedIn = props.isLoggedIn;
  }

  update() {
    this.mainApi.getUserData()
    .then(res => {
      this.render({
        isLoggedIn: res.isLoggedIn,
        userName: res.userName,
      });
    })
    .catch(err => {
      console.log("Ошибка в getUserData:", err.message)
    });
  }
}
