import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, formSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
  }

  open(confirmDeleteCard) {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      confirmDeleteCard();
    });
    super.open();
  }
}
