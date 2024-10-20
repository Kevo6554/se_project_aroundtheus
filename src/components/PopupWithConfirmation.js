import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleConfirm }) {
    super({ popupSelector });
    this._handleConfirm = handleConfirm;
    console.log(document.querySelector(".modal__form")); // Check what gets logged

    this._confirmButton = this._popupElement.querySelector(
      "#confirmation-add-modal"
    );
  }

  open(submitFunction) {
    this._handleConfirm = submitFuction;
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
