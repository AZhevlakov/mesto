import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'btn_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
};

// Profile
const profileEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = popupProfileEdit.querySelector('.form');
const profileNameInput = formProfileEdit.querySelector('.form__input_el_name');
const profileJobInput = formProfileEdit.querySelector('.form__input_el_job');

// Card
const cardsGallery = document.querySelector('.photo-gallery__items');
const cardAdd = document.querySelector('.profile__photo-card-add');
const cardTemplate = document.querySelector('#photo-card-template').content;

const popupCardAdd = document.querySelector('.popup_type_photo-card-add');
const formCardAdd = popupCardAdd.querySelector('.form');
const cardNameInput = formCardAdd.querySelector('.form__input_el_card-name');
const cardLinkInput = formCardAdd.querySelector('.form__input_el_card-link');

// Img
export const popupImg = document.querySelector('.popup_type_img-open');
export const imgPopupImg = popupImg.querySelector('.photo-viewer__image');
export const captionPopupImg = popupImg.querySelector('.photo-viewer__description');


const popups = document.querySelectorAll('.popup');
const popupsClose = document.querySelectorAll('.popup__close');


const validationFormProfileEdit = new FormValidator(validationSettings, formProfileEdit);
validationFormProfileEdit.enableValidation();

const validationFormCardAdd = new FormValidator(validationSettings, formCardAdd);
validationFormCardAdd.enableValidation();



// Обработчик нажатия на клавишу клавиатуры
function keydownHandler(evt) {
  // Обработчик нажатия на Esc
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// Обработчик нажатия в/вне попапа
function clickPopupHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// Функция открытия попапов
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keydownHandler);
}

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownHandler);
}

// Добавление фотокарточки
function addCard(cardElement, containerLink) {
  containerLink.prepend(cardElement);
}

// Добавление фотокарточки
function createCard(cardName, link) {
  const card = new Card(cardName, link, '#photo-card-template');
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавление набора фотокарточек при загрузке страницы
function addCardsOnLoad() {
  const initialCards = [
    {
      cardName: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      cardName: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      cardName: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      cardName: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      cardName: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      cardName: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  initialCards.forEach((item) => {
    const cardElement = createCard(item.cardName, item.link);
    addCard(cardElement, cardsGallery);
  });
}


// Слушатели событий

// Обработчик нажатия на кнопку редактирования профиля
profileEdit.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;

  validationFormProfileEdit.resetError();

  openPopup(popupProfileEdit);
});

// Обработчик отправки формы редактирования профиля
formProfileEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closePopup(popupProfileEdit);
});

// Обработчик нажатия на кнопку добавления новой карточки
cardAdd.addEventListener('click', () => {
  validationFormCardAdd.resetError();

  openPopup(popupCardAdd);
});

// Обработчик отправки формы создания новой фотокарточки
formCardAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardElement = createCard(cardNameInput.value, cardLinkInput.value);
  addCard(cardElement, cardsGallery);
  closePopup(popupCardAdd);
  evt.target.reset();
});

// Добавление обработчиков на крестики закрытия попапов
popupsClose.forEach((item) => {
  const popup = item.closest('.popup');
  item.addEventListener('click', () => {
    closePopup(popup);
  });
});

// Добавление слушателей нажатия на ЛКМ в попапе
popups.forEach((popup) => {
  popup.addEventListener('mousedown', clickPopupHandler);
});


// Добавление набора фотокарточек при загрузке страницы
addCardsOnLoad();
