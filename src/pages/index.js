import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import {
  validationSettings,
  popupSettings,
  initialCards,
  profileEdit,
  formProfileEdit,
  profileNameInput,
  profileJobInput,
  cardAdd,
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
  validationSettings.formSelector,
  validationSettings.inputSelector,
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
  validationSettings.formSelector,
  validationSettings.inputSelector,
  {
    handleFormSubmit: (formData) => {
      cardsList.addItem(
        createCard(
          formData['card-name-input'],
          formData['card-link-input']
        )
      );

      popupCardAdd.close();
    }
  }
);
popupCardAdd.setEventListeners();

const popupImg = new PopupWithImage(
  popupSettings.popupImgSelector,
  popupSettings.imgViewerSelector,
  popupSettings.imgCaptionSelector
);
popupImg.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__job'
});

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item.name, item.link));
    }
  },
  '.photo-gallery__items'
);

const createCard = (name, link) => {
  const card = new Card(
    {
      cardName: name,
      cardLink: link,
      handleCardClick: () => {
        popupImg.open({ name: name, link: link });
      }
    },
    '#photo-card-template');
  return card.generateCard();
}

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
