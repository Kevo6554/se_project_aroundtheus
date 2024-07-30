export default class Card {
    constructor( data, cardSelector, handleImageClick){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }
}

_setEventListeners() {
    
    this._cardElement.querySelector(".card__like-button")
    .addEventListener("click", () => {
        this._handleLikeIcon();
    });

    this._cardElement.querySelector(".card__trash-button").addEventListener("click", () => {
        this._handleTrashButton();
    });

    this._cardImageElement.addEventListener('click', () => {
        this._handleImageClick(this);
      });
}

_handleTrashButton () {
    this._cardElement.remove();
}


_handleLikeIcon() {
    this._cardElement.querySelector(".card__like-button").classList.toggle(".card__like-button_active");

}

getTemplate() {
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
    return cardElement;


}