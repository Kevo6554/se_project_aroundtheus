export default class Card {
  constructor(data, cardSelector, handleImageClick, deleteCard, likeCard) {
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._deleteCard = deleteCard;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._likeCard = likeCard;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._likeButton.addEventListener("click", () => {
      this._likeCard(this);
      this._likeButton.classList.toggle("card__like-button_active");
    });

    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._deleteCard(this);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this.setButtonState();
  }

  setButtonState() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  remove() {
    this._cardElement.remove();
  }

  getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }

  generateCard() {
    this._cardElement = this.getTemplate();
    this._cardElement.querySelector(".card__image").src = this.link;
    this._cardElement.querySelector(".card__image").alt = this.name;
    this._cardElement.querySelector(".card__title").textContent = this.name;

    this._setEventListeners();

    return this._cardElement;
  }
}
