export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'btn_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
};

export const popupSettings = {
  popupProfileEditSelector: '.popup_type_profile-edit',
  popupCardAddSelector: '.popup_type_photo-card-add',
  popupImgSelector: '.popup_type_img-open',
  popupClass: 'popup',
  openedPopupClass: 'popup_opened', // class открытого попапа
  popupCloseButton: '.popup__close' // button закрытия попапа
};

export const popupWithImageSettings = {
  imagePopupImg: '.photo-viewer__image',
  captionPopupImg: '.photo-viewer__description'
};


// Profile
export const profileEdit = document.querySelector('.profile__edit');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

export const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
export const formProfileEdit = popupProfileEdit.querySelector('.form');
export const profileNameInput = formProfileEdit.querySelector('.form__input_el_name');
export const profileJobInput = formProfileEdit.querySelector('.form__input_el_job');

// Card
export const cardsGallery = document.querySelector('.photo-gallery__items');
export const cardAdd = document.querySelector('.profile__photo-card-add');
export const cardTemplate = document.querySelector('#photo-card-template').content;

export const popupCardAdd = document.querySelector('.popup_type_photo-card-add');
export const formCardAdd = popupCardAdd.querySelector('.form');
export const cardNameInput = formCardAdd.querySelector('.form__input_el_card-name');
export const cardLinkInput = formCardAdd.querySelector('.form__input_el_card-link');

// Img
export const popupImg = document.querySelector('.popup_type_img-open');
export const imgPopupImg = popupImg.querySelector('.photo-viewer__image');
export const captionPopupImg = popupImg.querySelector('.photo-viewer__description');


export const popups = document.querySelectorAll('.popup');
export const popupsClose = document.querySelectorAll('.popup__close');
