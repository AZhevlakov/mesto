import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, inputSelector, submitButtonSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._inputList = this._form.querySelectorAll(inputSelector);
    this._submitButton = this._popup.querySelector(submitButtonSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  // Функция закрытия попапов
  close() {
    super.close();

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    // Обработчик сабмита формы
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      // перед запросом сохраняем изначальный текст кнопки
      const initialText = this._submitButton.textContent;
      // меняем его, чтобы показать пользователю ожидание
      this._submitButton.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close()) // закрывается попап в `then`
        .catch(err => alert(err))
        .finally(() => {
          this._submitButton.textContent = initialText;
        }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
    });
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
}
