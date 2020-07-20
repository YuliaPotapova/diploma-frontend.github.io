import { setIsClosed, removeIsClosed } from '../utils/utils';

// ================================= Класс для шапки сайта ========================================
export default class Header {
  constructor(
    savedArticlesElArr,
    buttonAuthElArr,
    buttonLogOutElArr,
    userNamesElArr,
    mobileMenuIconEl,
    menuPopupEl,
    menuPopupCloseIconEl,
  ) {
    this.savedArticlesElArr = savedArticlesElArr;
    this.buttonAuthElArr = buttonAuthElArr;
    this.buttonLogOutElArr = buttonLogOutElArr;
    this.userNamesArr = userNamesElArr;
    this.mobileMenuIconEl = mobileMenuIconEl;
    this.menuPopupEl = menuPopupEl;
    this.menuPopupCloseIconEl = menuPopupCloseIconEl;
  }

  _init(mainApi, popupEntry, cardList) {
    this.mainApi = mainApi;
    this.cardList = cardList;

    this.buttonAuthElArr.forEach((el) => {
      el.addEventListener('click', () => {
        setIsClosed([this.menuPopupEl, this.mobileMenuIconEl]);
        popupEntry.open();
      });
    });
    this.buttonLogOutElArr.forEach((el) => {
      el.addEventListener('click', () => this.logout());
    });
    this.mobileMenuIconEl.addEventListener('click', () => removeIsClosed([this.menuPopupEl]));
    this.menuPopupCloseIconEl.addEventListener('click', () => setIsClosed([this.menuPopupEl]));

    this.render({ isLoggedIn: false, userName: '' });
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getName() {
    return this.userName;
  }

  render(props) {
    if (props.isLoggedIn) {
      this.userNamesArr.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
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
    this.userName = props.userName;
  }

  update() {
    this.mainApi.getUserData()
      .then((res) => {
        this.render({
          isLoggedIn: res.isLoggedIn,
          userName: res.userName,
        });
        this.cardList.updateCards();
      })
      .catch((err) => {
        console.log('Ошибка в getUserData:', err.message);
      });
  }

  logout() {
    this.mainApi.signout()
      .then((res) => {
        if (res) this.update();
      })
      .catch((err) => {
        console.log('Ошибка в logout:', err.message);
      });
  }
}
