import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleConfirm }) {
    super({ popupSelector });
    this._handleConfirm = handleConfirm;
    console.log(document.querySelector("._modal__form")); // Check what gets logged

    this._confirmButton = this._popupElement.querySelector(".modal__form");
  }

  open(cardId, cardEl) {
    super.open();
    this._cardId = cardId;
    this._cardEl = cardEl;
  }

  _setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm(this._cardId, this._cardEl);
      this.close();
    });
  }
}

export default PopupWithConfirmation;
