import { popupSettings } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  // Функция открытия попапов
  open() {
    this._popup.classList.add(popupSettings.openedPopupClass);

    // Установка слушателя нажатия на клавишу клавиатуры
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Функция закрытия попапов
  close() {
    this._popup.classList.remove(popupSettings.openedPopupClass);

    // Удаление слушателя нажатия на клавишу клавиатуры
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Обработчик нажатия на Esc (для закрытия попапа)
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    // Обработчик на кнопку закрытия попапа
    this._popupButtonClose = this._popup.querySelector(popupSettings.popupCloseButton);
    this._popupButtonClose.addEventListener('click', () => {
      this.close();
    });

    // Обработчик нажатия в/вне попапа
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(popupSettings.popupClass)) {
        this.close();
      }
    });
  }
}
