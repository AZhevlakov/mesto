import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import {
  validationSettings,
  popupSettings,
  initialCards,
  profileEdit,
  cardAdd,
  profileNameInput,
  profileJobInput,
  formProfileEdit,
  formCardAdd
} from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';


const validationFormProfileEdit = new FormValidator(validationSettings, formProfileEdit);
validationFormProfileEdit.enableValidation();

const validationFormCardAdd = new FormValidator(validationSettings, formCardAdd);
validationFormCardAdd.enableValidation();

const popupProfileEdit = new PopupWithForm(
  popupSettings.popupProfileEditSelector,
  {
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData['name-input'], formData['job-input']);

      popupProfileEdit.close();
    }
  }
);
popupProfileEdit.setEventListeners();

const popupCardAdd = new PopupWithForm(
  popupSettings.popupCardAddSelector,
  {
    handleFormSubmit: (formData) => {

      const card = new Card(
        {
          cardName: formData['card-name-input'],
          cardLink: formData['card-link-input'],
          handleCardClick: () => {
            popupImg.open({
              name: formData['card-name-input'],
              link: formData['card-link-input']
            });
          }
        },
        '#photo-card-template');
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);

      popupCardAdd.close();
    }
  }
);
popupCardAdd.setEventListeners();

const popupImg = new PopupWithImage(popupSettings.popupImgSelector);
popupImg.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__job'
});

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          cardName: item.name,
          cardLink: item.link,
          handleCardClick: () => {
            popupImg.open({ name: item.name, link: item.link });
          }
        },
        '#photo-card-template');
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }
  },
  '.photo-gallery__items'
);

cardsList.renderItems();


// Обработчик нажатия на кнопку редактирования профиля
profileEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  profileNameInput.value = data.name;
  profileJobInput.value = data.job;

  validationFormProfileEdit.resetError();

  popupProfileEdit.open();
});

// Обработчик нажатия на кнопку добавления новой карточки
cardAdd.addEventListener('click', () => {
  validationFormCardAdd.resetError();

  popupCardAdd.open();
});
