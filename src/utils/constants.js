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
  imgViewerSelector: '.photo-viewer__image',
  imgCaptionSelector: '.photo-viewer__description',
  popupClass: 'popup',
  openedPopupClass: 'popup_opened', // class открытого попапа
  popupCloseButton: '.popup__close' // button закрытия попапа

};


// Profile
export const profileEdit = document.querySelector('.profile__edit');
const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
export const formProfileEdit = popupProfileEdit.querySelector('.form');
export const profileNameInput = formProfileEdit.querySelector('.form__input_el_name');
export const profileJobInput = formProfileEdit.querySelector('.form__input_el_job');

// Card
export const cardAdd = document.querySelector('.profile__photo-card-add');
const popupCardAdd = document.querySelector('.popup_type_photo-card-add');
export const formCardAdd = popupCardAdd.querySelector('.form');
