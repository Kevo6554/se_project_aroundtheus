export default class FormValidator {
  constructor(storage, enableButton) {
    this._title = storage.title;
    this._url = storage.url;
    this._enableButton = enableButton;
  }

  _setEventListeners() {
    this._cardAddForm
      .querySelector(".modal__button")
      .addEventListener("click", () => {
        this._submitButton();
      });

    this._cardAddForm
      .querySelector(".modal__error")
      .addEventListener("click", () => {
        this._fieldValidity();
      });

    this._cardAddForm
      .querySelectot(".modal__button_disabled")
      .addEventListener("click", () => {
        this._disableValidation();
      });
  }

  _fieldValidity() {
    this._cardAddForm
      .querySelector(".modal__error")
      .classList.toggle(".modal__input");
  }

  _submitButton() {
    this._cardAddForm
      .querySelector(this._enableButton)
      .content.querySelector(".modal__button");
  }

  enbaleValidation() {
    this._cardAddForm = document
      .querySelector(this._enableButton)
      .content.querySelector(".modal")
      .cloneNode(true);
  }

  _disableValidation() {
    this._cardAddForm
      .querySelector(this._enableButton)
      .content.querySelecto(".modal__button_disabled");
  }
}
