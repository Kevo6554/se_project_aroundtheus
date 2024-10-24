import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });

    console.log(document.querySelector(".modal__form")); // Check what gets logged
    this._formElement = this._popupElement.querySelector(".modal__form");
    this._confirmButton = this._popupElement.querySelector(
      "#confirmation-add-modal"
    );
  }

  _handleDeleteCard(card) {
    card.remove();
    card = null;
  }

  setSubmitAction(handleSubmit) {
    this._handleFormSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    console.log(this._formElement);
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
  }
}

export default PopupWithConfirmation;
