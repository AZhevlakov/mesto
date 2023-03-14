const profileEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close');

const formProfile = document.querySelector('.form-profile');
const profileNameInput = formProfile.querySelector('.form-profile__item_el_name');
const profileJobInput = formProfile.querySelector('.form-profile__item_el_job');

// открытие формы редактирования профиля пользователя
function openPopup() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;

  popup.classList.add('popup_opened');
}

// закрытие формы
function closePopup() {
  popup.classList.remove('popup_opened');
}

// отправка и закрытие формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closePopup();
}

// слушатели событий
profileEdit.addEventListener('click', openPopup);
formProfile.addEventListener('submit', handleFormSubmit);
popupClose.addEventListener('click', closePopup);
