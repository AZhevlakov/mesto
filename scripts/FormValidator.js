export class FormValidator {
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
  }

  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);

    this._resetError();

    this._setEventListeners();
  }

  _resetError() {// = (formElement, this._validationSettings) => {
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
    this._toggleButtonState();
  }

  _toggleButtonState() {// = (inputList, submitButtonElement, this._validationSettings) => {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.classList.add(this._validationSettings.inactiveButtonClass);
      this._submitButtonElement.setAttribute('disabled', true);
    } else {
      this._submitButtonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput() {// = (inputList) => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {// = (formElement, this._validationSettings) => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }

  _checkInputValidity(inputElement) {// = (formElement, inputElement, this._validationSettings) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {// = (formElement, inputElement, errorMessage, this._validationSettings) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validationSettings.errorClass);
  }

  _hideInputError(inputElement) {// = (formElement, inputElement, errorSettings) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorClass);
    errorElement.textContent = '';
  }
}
