import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });

    console.log(document.querySelector(".modal__form")); // Check what gets logged

    this._confirmButton = this._popupElement.querySelector(
      "#confirmation-add-modal"
    );
  }

  _removeCard(card) {
    card.remove();
    card = null;
  }

  setSubmitAction(handleSubmit) {
    this._handleConfirm = handleSubmit;
  }

  setLoading(isLoading, text) {
    if (isLoading) {
      this._confirmButton.textContent = "Deleting...";
    } else {
      this._confirmButton.textContent = text;
    }
  }

  _setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm();
      this.close();
    });
  }
}

export default PopupWithConfirmation;
