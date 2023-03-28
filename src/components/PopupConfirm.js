import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, formSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
  }

  open(confirmDeleteCard) {
    this._confirmDeleteCard = confirmDeleteCard;

    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    // Обработчик сабмита формы
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmDeleteCard();
    });
  }
}
