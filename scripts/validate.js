const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'btn_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, submitButtonElement, errorSettings) => {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.classList.add(errorSettings.inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove(errorSettings.inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  }
}

const showInputError = (formElement, inputElement, errorMessage, errorSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(errorSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorSettings.errorClass);
};

const hideInputError = (formElement, inputElement, errorSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(errorSettings.inputErrorClass);
  errorElement.classList.remove(errorSettings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, errorSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorSettings);
  } else {
    hideInputError(formElement, inputElement, errorSettings);
  }
};

const setEventListeners = (formElement, errorSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(errorSettings.inputSelector));
  const submitButtonElement = formElement.querySelector(errorSettings.submitButtonSelector);
  toggleButtonState(inputList, submitButtonElement, errorSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, errorSettings);
      toggleButtonState(inputList, submitButtonElement, errorSettings);
    });
  });
};

const resetError = (formElement, errorSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(errorSettings.inputSelector));
  const submitButtonElement = formElement.querySelector(errorSettings.submitButtonSelector);
  inputList.forEach(inputElement => hideInputError(formElement, inputElement, errorSettings));
  toggleButtonState(inputList, submitButtonElement, errorSettings);
}

const enableValidation = (errorSettings) => {
  const formList = Array.from(document.querySelectorAll(errorSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, errorSettings);
  });
};


enableValidation(validationSettings);
