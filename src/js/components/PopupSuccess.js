import Popup from './Popup';

export default class PopupSuccess extends Popup {
  constructor(
    popupSuccessEl, popupSuccessCloseEl,
    successLinkToEntryEl,
    headerMobileMenuIconEl,
  ) {
    super(
      undefined, popupSuccessEl, undefined, popupSuccessCloseEl,
      undefined, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
      successLinkToEntryEl, headerMobileMenuIconEl,
    );
  }

  _init(popupEntry) {
    this.setEventListeners(undefined, popupEntry);
  }
}
