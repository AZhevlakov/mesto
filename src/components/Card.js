export default class Card {
  constructor({ cardName, cardLink, handleCardClick }, templateSelector) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.photo-card__image');
    this._cardTitle = this._element.querySelector('.photo-card__name');
    this._cardLike = this._element.querySelector('.photo-card__like');
    this._cardTrash = this._element.querySelector('.photo-card__delete');

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;

    this._setEventListeners();

    return this._element;
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard() {
    this._cardLike.classList.toggle('photo-card__like_active');
  }

  _setEventListeners() {
    this._cardTrash.addEventListener('click', () => {
      this._removeCard();
    });

    this._cardLike.addEventListener('click', () => {
      this._likeCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}
