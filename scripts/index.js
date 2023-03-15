// Profile
const profileEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = popupProfileEdit.querySelector('.form');
const profileNameInput = formProfileEdit.querySelector('.form__item_el_name');
const profileJobInput = formProfileEdit.querySelector('.form__item_el_job');
const popupProfileEditClose = popupProfileEdit.querySelector('.popup__close');

// Card
const cardsGallery = document.querySelector('.photo-gallery__items');
const cardAdd = document.querySelector('.profile__photo-card-add');

const popupCardAdd = document.querySelector('.popup_type_photo-card-add');
const formCardAdd = popupCardAdd.querySelector('.form');
const popupCardAddClose = popupCardAdd.querySelector('.popup__close');

// Img
const popupImg = document.querySelector('.popup_type_img-open');
const popupImgClose = popupImg.querySelector('.popup__close');


// Инициализация фотокарточки
const initCard = function (cardName, link) {
  const cardTemplate = document.querySelector('#photo-card-template').content;
  const card = cardTemplate.querySelector('.photo-card').cloneNode(true);

  card.querySelector('.photo-card__image').src = link;
  card.querySelector('.photo-card__image').alt = cardName;
  card.querySelector('.photo-card__name').textContent = cardName;

  const cardRemove = card.querySelector('.photo-card__delete');
  const cardLike = card.querySelector('.photo-card__like');
  const imgOpen = card.querySelector('.photo-card__image');

  cardRemove.addEventListener('click', removeCard);
  cardLike.addEventListener('click', likeCard);

  // Слушатель нажатия по изображению
  imgOpen.addEventListener('click', () => {
    popupImg.querySelector('.photo-viewer__image').src = link;
    popupImg.querySelector('.photo-viewer__image').alt = cardName;
    popupImg.querySelector('.photo-viewer__description').textContent = cardName;

    popupImg.classList.add('popup_opened');
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

// Открытие попапа редактирования профиля
function openPopupProfileEdit() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;

  popupProfileEdit.classList.add('popup_opened');
}

// Закрытие попапа редактирования профиля
function closePopupProfileEdit() {
  popupProfileEdit.classList.remove('popup_opened');
}

// Открытие попапа добавления новой фотокарточки
function openPopupCardAdd() {
  popupCardAdd.classList.add('popup_opened');
}

// Закрытие попапа добавления новой фотокарточки
function closePopupCardAdd() {
  popupCardAdd.classList.remove('popup_opened');
}

// Закрытие попапа просмотра изображения
function closePopupImg() {
  popupImg.classList.remove('popup_opened');
}

// Удаление фотокарточки
function removeCard(evt) {
  evt.target.closest('.photo-card').remove();
}

// Лайк фотокарточки
function likeCard(evt) {
  evt.target.classList.toggle('photo-card__like_active');
}

// Обработчик отправки формы редактирования профиля
function handleFormProfileEditSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closePopupProfileEdit();
}

// Обработчик отправки формы создания новой фотокарточки
function handleFormCardAddSubmit(evt) {
  evt.preventDefault();

  const cardNameInput = formCardAdd.querySelector('.form__item_el_card-name');
  const cardLinkInput = formCardAdd.querySelector('.form__item_el_card-link');

  addCard(initCard(cardNameInput.value, cardLinkInput.value), cardsGallery);

  closePopupCardAdd();

  cardNameInput.value = '';
  cardLinkInput.value = '';
}

// Слушатели событий
profileEdit.addEventListener('click', openPopupProfileEdit);
formProfileEdit.addEventListener('submit', handleFormProfileEditSubmit);
popupProfileEditClose.addEventListener('click', closePopupProfileEdit);
cardAdd.addEventListener('click', openPopupCardAdd);
formCardAdd.addEventListener('submit', handleFormCardAddSubmit);
popupCardAddClose.addEventListener('click', closePopupCardAdd);
popupImgClose.addEventListener('click', closePopupImg);

// Добавление набора фотокарточек при загрузке страницы
addCardsOnLoad();
