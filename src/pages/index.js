import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import {
  validationSettings,
  popupSettings,
  profileEdit,
  formProfileEdit,
  profileNameInput,
  profileJobInput,
  cardAdd,
  formCardAdd,
  avatarEdit,
  formAvatarEdit,
  avatarImage,
  userCardTemplateSelector,
  nonUserCardTemplateSelector,
  apiSettings,
  textBtnProfileEdit,
  textBtnAvatarEdit,
  textBtnCardAdd
} from '../utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


let cardsList;
let userId;


const api = new Api({
  baseUrl: apiSettings.baseUrl,
  headers: {
    authorization: apiSettings.token,
    'Content-Type': 'application/json'
  }
});

const user = api.getUserInfo();
user.then(res => {
  userInfo.setUserInfo(res.name, res.about);
  userInfo.setUserAvatar(res.avatar);
  userId = res._id;
})
  .catch(err => alert(err));

const initialCards = api.getInitialCards();
initialCards.then(res => {
  cardsList = new Section(
    {
      items: res,
      renderer: (item) => {
        cardsList.addItem(createCard(item));
      }
    },
    '.photo-gallery__items'
  );
  cardsList.renderItems();
})
  .catch(err => alert(err));


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
  {
    handleFormSubmit: (formData) => {
      textBtnProfileEdit.textContent = 'Сохранение ...';
      api.updateUserInfo(formData['name-input'], formData['job-input'])
      .then(res => {
        userInfo.setUserInfo(res.name, res.about);
      })
      .catch(err => alert(err))
      .finally(() => {
        popupProfileEdit.close();
        textBtnProfileEdit.textContent = 'Сохранить';
      });
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
      textBtnCardAdd.textContent = 'Создание ...';
      api.addCard(formData['card-name-input'], formData['card-link-input'])
      .then(res => {
        cardsList.addItem(createCard(res));
      })
      .catch(err => alert(err))
      .finally(() => {
        popupCardAdd.close();
        textBtnCardAdd.textContent = 'Создать';
      });
    }
  }
);
popupCardAdd.setEventListeners();

const popupAvatarEdit = new PopupWithForm(
  popupSettings.popupAvatarEditSelector,
  validationSettings.formSelector,
  validationSettings.inputSelector,
  {
    handleFormSubmit: (formData) => {
      textBtnAvatarEdit.textContent = 'Сохранение ...';
      api.updatetAvatar(formData['avatar-link-input'])
      .then(res => {
        avatarImage.src = res.avatar;
      })
      .catch(err => alert(err))
      .finally(() => {
        popupAvatarEdit.close();
        textBtnAvatarEdit.textContent = 'Сохранить';
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
          popupConfirm.close();
          api.deleteCard(data._id)
            .then(() => {
              card.deleteCard();
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



// Обработчик нажатия на кнопку изменения аватара
avatarEdit.addEventListener('click', () => {
  validationFormAvatarEdit.resetError();

  popupAvatarEdit.open();
});

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
