export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._cardElement.remove();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }
  _handleTrashButton() {
    this._cardElement.remove();
  }

  _handleLikeIcon() {
    this._cardElement.add();
  }

  getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }
}

class DefaultCard extends Card {
  constructor(data, cardSelector, handleImageClick) {
    super(cardSelector);
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  generateCard() {
    this._cardElement = super._getTemplate();
    super._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

class HorizontalCard extends Card {
  constructor(data, cardSelector, handleImageClick) {
    super(cardSelector);
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  generateCard() {
    this._cardElement = super._getTemplate();
    super._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

function createCard(item, cardType) {
  const card =
    cardType === "grid"
      ? new DefaultCard(item, ".default-card")
      : new HorizontalCard(item, ".horizontal-card");

  return card.generateCard();
}

function renderCard(item, cardType) {
  const cardElement = createCard(item, cardType);
  cardListEl.prepend(cardElement);
}
// Event Listeners for buttons
profileEditButton.addEventListener("click", () => {
  renderElements(true);
});

cardAddButton.addEventListener("click", () => {
  renderElements(false);
});

const renderElements = (isGrid) => {
  cardListEl.innerHTML = "";
  items.forEach((item) => {
    const cardType = isGrid ? "grid" : "horizontal";
    renderCard(item, cardType);
  });
};

renderElements();
