import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    console.log(this._popupElement); // Check if this logs the correct element
    if (!this._popupElement) {
      throw new Error(`Element not found for selector: ${selector}`);
    }
  }

  setLoading(isLoading) {
    this._submitBtn = this._popupElement.querySelector(".modal__button");
    if (isLoading) {
      this._submitBtn.textContent = "Saving...";
    } else {
      this._submitBtn.textContent = "Submit";
    }
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;
