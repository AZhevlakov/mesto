const popups = document.querySelectorAll('.popup');

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
const popupImg = document.querySelector('.popup_type_img-open');
const imgPopupImg = popupImg.querySelector('.photo-viewer__image');
const captionPopupImg = popupImg.querySelector('.photo-viewer__description');


const popupsClose = document.querySelectorAll('.popup__close');

popupsClose.forEach((item) => {
  const popup = item.closest('.popup');
  item.addEventListener('click', () => {
    closePopup(popup);
  });
});

// Обработчик нажатия на клавишу клавиатуры
function keydownHandler(evt) {

  // Обработчик нажатия на Esc
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
  }
}

// Обработчик клика в попапе
function clickPopupHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keydownHandler);
  popup.addEventListener('click', clickPopupHandler);
}

// Функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownHandler);
  popup.removeEventListener('click', clickPopupHandler);
}

// Инициализация фотокарточки
const initCard = function (name, link) {
  const card = cardTemplate.querySelector('.photo-card').cloneNode(true);
  const cardRemove = card.querySelector('.photo-card__delete');
  const cardLike = card.querySelector('.photo-card__like');
  const cardImg = card.querySelector('.photo-card__image');
  const cardName = card.querySelector('.photo-card__name');

  cardImg.src = link;
  cardImg.alt = name;
  cardName.textContent = name;

  // Обработчик нажатия на кнопку удаления карточки
  cardRemove.addEventListener('click', removeCard);

  // Обработчик нажатия на лайк в карточке
  cardLike.addEventListener('click', likeCard);

  // Обработчик нажатия по изображению
  cardImg.addEventListener('click', () => {
    imgPopupImg.src = link;
    imgPopupImg.alt = name;
    captionPopupImg.textContent = name;

    openPopup(popupImg);
  });

  return card;
};

// Добавление фотокарточки
function addCard(item, containerLink) {
  containerLink.prepend(item);
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
    addCard(initCard(item.cardName, item.link), cardsGallery);
  });
}

// Удаление фотокарточки
function removeCard(evt) {
  evt.target.closest('.photo-card').remove();
}

// Лайк фотокарточки
function likeCard(evt) {
  evt.target.classList.toggle('photo-card__like_active');
}


// Слушатели событий

// Обработчик нажатия на кнопку редактирования профиля
profileEdit.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;

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
  openPopup(popupCardAdd);
});

// Обработчик отправки формы создания новой фотокарточки
formCardAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(initCard(cardNameInput.value, cardLinkInput.value), cardsGallery);
  closePopup(popupCardAdd);
  evt.target.reset();
});


// Добавление набора фотокарточек при загрузке страницы
addCardsOnLoad();
