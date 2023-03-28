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
  popupAvatarEditSelector: '.popup_type_avatar-edit',
  popupConfirmSelector: '.popup_type_confirm',
  popupImgSelector: '.popup_type_img-open',
  imgViewerSelector: '.photo-viewer__image',
  imgCaptionSelector: '.photo-viewer__description',
  popupClass: 'popup',
  openedPopupClass: 'popup_opened', // class открытого попапа
  popupCloseButton: '.popup__close' // button закрытия попапа
};


const serverUrl = 'https://mesto.nomoreparties.co';
const groupId = 'cohort-63';

export const apiSettings = {
  baseUrl: `${serverUrl}/v1/${groupId}`,
  token: '81d79220-a31e-4e79-b59a-48c3328e2b89'
  // userId: '301126699109aa699d606fa4'
};


// Profile
export const avatarEdit = document.querySelector('.profile__avatar-edit');
const popupAvatarEdit = document.querySelector('.popup_type_avatar-edit');
export const formAvatarEdit = popupAvatarEdit.querySelector('.form');

export const profileEdit = document.querySelector('.profile__edit');
const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
export const formProfileEdit = popupProfileEdit.querySelector('.form');

// Card
export const cardAdd = document.querySelector('.profile__photo-card-add');
const popupCardAdd = document.querySelector('.popup_type_photo-card-add');
export const formCardAdd = popupCardAdd.querySelector('.form');

export const userCardTemplateSelector = '#photo-card-template-default';
export const nonUserCardTemplateSelector = '#photo-card-template-non-user-card';
