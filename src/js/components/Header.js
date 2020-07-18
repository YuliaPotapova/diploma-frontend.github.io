import {setIsClosed, removeIsClosed} from '../utils/utils.js';

// =================================== Класс для шапки сайта =========================================
export class Header {
  constructor(savedArticlesElArr, buttonAuthElArr, buttonLogOutElArr, userNamesElArr, mainApi, popupEntry) {
    this.savedArticlesElArr = savedArticlesElArr;
    this.buttonAuthElArr = buttonAuthElArr;
    this.buttonLogOutElArr = buttonLogOutElArr;
    this.userNamesArr = userNamesElArr;
    this.mainApi = mainApi;
    this.popupEntry = popupEntry;

    this.render({isLoggedIn: false});
  }

  render(props) {
    if (props.isLoggedIn) {
      removeIsClosed(this.savedArticlesElArr);
      setIsClosed(this.buttonAuthElArr);
      this.userNamesArr.forEach(el => {
        el.textContent = props.userName;
      });
      removeIsClosed(this.buttonLogOutElArr);
    } else {
      setIsClosed(this.savedArticlesElArr);
      removeIsClosed(this.buttonAuthElArr);
      setIsClosed(this.buttonLogOutElArr);
    }
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

  setEventListeners() {
    this.buttonAuthElArr.forEach(el => {
      el.addEventListener('click', () => this.popupEntry.open());
    });
    // this.buttonLogOutElArr.forEach(el => {
    //   el.addEventListener('click', () => this.render({ isLoggedIn: false, userName: undefined }));
    // });
  }
}
