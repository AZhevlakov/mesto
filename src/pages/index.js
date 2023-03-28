import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import {
  validationSettings,
  popupSettings,
  profileEdit,
  formProfileEdit,
  cardAdd,
  formCardAdd,
  avatarEdit,
  formAvatarEdit,
  userCardTemplateSelector,
  nonUserCardTemplateSelector,
  apiSettings
} from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let userId;


const api = new Api({
  baseUrl: apiSettings.baseUrl,
  headers: {
    authorization: apiSettings.token,
    'Content-Type': 'application/json'
  }
});

const userData = api.getUserInfo();

const initialCards = api.getInitialCards();

Promise.all([userData, initialCards])
.then(([resUser, resInitialCards]) => {
  userInfo.setUserInfo(resUser.name, resUser.about);
  userInfo.setUserAvatar(resUser.avatar);
  userId = resUser._id;

  cardsList.renderItems(resInitialCards);
})
.catch(err => alert(err));


const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    }
  },
  '.photo-gallery__items'
);

const createCard = (data) => {
  let isOwner = false;
  let templateSelector = nonUserCardTemplateSelector;

  if (userId === data.owner._id) {
    isOwner = true;
    templateSelector = userCardTemplateSelector;
  }

  let isLiked = false;
  for (let i = 0; i < data.likes.length; i++) {
    if (data.likes[i]._id === userId) {
      isLiked = true;
      break;
    }
  }

  const card = new Card(
    {
      isOwner: isOwner,
      cardName: data.name,
      cardLink: data.link,
      likes: data.likes,
      isLiked: isLiked,
      cardId: data._id,
      owner: data.owner,
      handleCardClick: () => {
        popupImg.open({ name: data.name, link: data.link });
      },
      handleDeleteCard: () => {
        popupConfirm.open(() => {
          api.deleteCard(data._id)
            .then(() => {
              card.deleteCard();
              popupConfirm.close();
            })
            .catch(err => alert(err));
        });
      },
      handleLike: () => {
        if (!isLiked) {
          api.putLike(data._id)
            .then(res => {
              isLiked = true;
              card.likeCard(res.likes);
            })
            .catch(err => alert(err));
        } else {
          api.deleteLike(data._id)
            .then(res => {
              isLiked = false;
              card.likeCard(res.likes);
            })
            .catch(err => alert(err));
        }
      }
    },
    templateSelector
  );
  return card.generateCard();
}

const validationFormProfileEdit = new FormValidator(validationSettings, formProfileEdit);
validationFormProfileEdit.enableValidation();

const validationFormCardAdd = new FormValidator(validationSettings, formCardAdd);
validationFormCardAdd.enableValidation();

const validationFormAvatarEdit = new FormValidator(validationSettings, formAvatarEdit);
validationFormAvatarEdit.enableValidation();

const popupProfileEdit = new PopupWithForm(
  popupSettings.popupProfileEditSelector,
  validationSettings.formSelector,
  validationSettings.inputSelector,
  validationSettings.submitButtonSelector,
  {
    handleFormSubmit: (formData) => {
      return api.updateUserInfo(formData['name-input'], formData['job-input'])
      .then(res => {
        userInfo.setUserInfo(res.name, res.about);
      });
    }
  }
);
popupProfileEdit.setEventListeners();

const popupCardAdd = new PopupWithForm(
  popupSettings.popupCardAddSelector,
  validationSettings.formSelector,
  validationSettings.inputSelector,
  validationSettings.submitButtonSelector,
  {
    handleFormSubmit: (formData) => {
      return api.addCard(formData['card-name-input'], formData['card-link-input'])
      .then(res => {
        cardsList.addItem(createCard(res));
      });
    }
  }
);
popupCardAdd.setEventListeners();

const popupAvatarEdit = new PopupWithForm(
  popupSettings.popupAvatarEditSelector,
  validationSettings.formSelector,
  validationSettings.inputSelector,
  validationSettings.submitButtonSelector,
  {
    handleFormSubmit: (formData) => {
      return api.updatetAvatar(formData['avatar-link-input'])
      .then(res => {
        userInfo.setUserAvatar(res.avatar);
      });
    }
  }
);
popupAvatarEdit.setEventListeners();

const popupConfirm = new PopupConfirm(
  popupSettings.popupConfirmSelector,
  validationSettings.formSelector
);
popupConfirm.setEventListeners();

const popupImg = new PopupWithImage(
  popupSettings.popupImgSelector,
  popupSettings.imgViewerSelector,
  popupSettings.imgCaptionSelector
);
popupImg.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__job',
  profileAvatarSelector: '.profile__avatar'
});



// Обработчик нажатия на кнопку изменения аватара
avatarEdit.addEventListener('click', () => {
  validationFormAvatarEdit.resetError();

  popupAvatarEdit.open();
});

// Обработчик нажатия на кнопку редактирования профиля
profileEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  popupProfileEdit.setInputValues(data);

  validationFormProfileEdit.resetError();

  popupProfileEdit.open();
});

// Обработчик нажатия на кнопку добавления новой карточки
cardAdd.addEventListener('click', () => {
  validationFormCardAdd.resetError();

  popupCardAdd.open();
});
