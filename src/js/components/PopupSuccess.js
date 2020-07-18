import {Popup} from './Popup.js';

export class PopupSuccess extends Popup {
  constructor(
    popupSuccessEl, popupSuccessCloseEl,
    successLinkToEntryEl
  ) {
    super(
      undefined, popupSuccessEl, undefined, popupSuccessCloseEl,
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
      successLinkToEntryEl
    );
  }

  _init(popupEntry) {
    this.setEventListeners(undefined, popupEntry);
  }
}