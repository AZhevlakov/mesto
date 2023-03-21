import { popupImg, imgPopupImg, captionPopupImg, openPopup } from './index.js';

export class Card {
  constructor(cardName, link, templateSelector) {
    this._cardName = cardName;
    this._link = link;
    this._isLiked = false;
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

    this._cardImage.src = this._link;
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
    this._isLiked = !this._isLiked;
  }

  _openImg() {

    imgPopupImg.src = this._link;
    imgPopupImg.alt = this._cardName;
    captionPopupImg.textContent = this._cardName;

    openPopup(popupImg);
  }

  _setEventListeners() {
    this._cardTrash.addEventListener('click', () => {
      this._removeCard();
    });

    this._cardLike.addEventListener('click', () => {
      this._likeCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._openImg();
    });
  }
}
