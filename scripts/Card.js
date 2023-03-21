import {popupImg, imgPopupImg, captionPopupImg, openPopup} from './index.js';

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

    this._element.querySelector('.photo-card__image').src = this._link;
    this._element.querySelector('.photo-card__image').alt = this._cardName;
    this._element.querySelector('.photo-card__name').textContent = this._cardName;

    this._setEventListeners();

    return this._element;
  }

  _removeCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element.querySelector('.photo-card__like').classList.toggle('photo-card__like_active');
    this._isLiked = !this._isLiked;
  }

  _openImg() {

    imgPopupImg.src = this._link;
    imgPopupImg.alt = this._cardName;
    captionPopupImg.textContent = this._cardName;

    openPopup(popupImg);
  }

  _setEventListeners() {
    this._element.querySelector('.photo-card__delete').addEventListener('click', () => {
      this._removeCard();
    });

    this._element.querySelector('.photo-card__like').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.photo-card__image').addEventListener('click', () => {
      this._openImg();
    });
  }
}
