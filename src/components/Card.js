export default class Card {
  constructor(
    {
      userId,
      isOwner,
      cardName,
      cardLink,
      likes,
      isLiked,
      cardId,
      owner,
      handleCardClick,
      handleDeleteCard,
      handleLike
    },
    templateSelector
  ) {
    this._isOwner = isOwner;
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._likes = likes;
    this._isLiked = isLiked;
    this._cardId = cardId;
    this._owner = owner;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
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
    this._cardNumberOfLikes = this._element.querySelector('.photo-card__number-of-likes');
    if (this._isOwner) {
      this._cardTrash = this._element.querySelector('.photo-card__delete');
    }

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;
    this._cardNumberOfLikes.textContent = this._likes.length;

    if (this._isLiked) {
      this._cardLike.classList.add('photo-card__like_active');
    }

    this._setEventListeners();

    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  likeCard(newLikes) {
    this._likes = newLikes;
    this._cardLike.classList.toggle('photo-card__like_active');
    this._cardNumberOfLikes.textContent = this._likes.length;
  }

  _setEventListeners() {
    if (this._isOwner) {
      this._cardTrash.addEventListener('click', () => {
        this._handleDeleteCard();
      });
    }

    this._cardLike.addEventListener('click', () => {
      this._handleLike();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}
