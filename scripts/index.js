const profileEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close');

const formProfile = document.querySelector('.form-profile');
const profileNameInput = formProfile.querySelector('.form-profile__item_el_name');
const profileJobInput = formProfile.querySelector('.form-profile__item_el_job');


function openPopup() {
  console.log(4);
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;

  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closePopup();
}

profileEdit.addEventListener('click', openPopup);
formProfile.addEventListener('submit', handleFormSubmit);
popupClose.addEventListener('click', closePopup);
