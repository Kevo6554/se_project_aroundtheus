class FormValidator {
  constructor(options, formEL) {
    this._errorClass = options.errorClass;
    this._inputErrorClass = options.inputerrorClass;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._formEL = formEL;

    this._inputEls = [...this._formEL.querySelectorAll(options.inputSelector)];
    this._submitBtn = this._formEL.querySelector(options.submitButtonSelector);
  }
  _setEventListeners() {
    this._inputEls.forEach((inputEL) => {
      inputEL.addEventListener("input", () => {
        this._checkInputValidity(inputEL);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState(); // Initial button state
  }

  _showInputError(inputEL) {
    const errorMessageEl = formEL.querySelector(`${selector}-error`);
    inputEL.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEL) {
    const inputErrorMessageEl = formEL.querySelector(`#${inputEL.id}-error`);
    inputEL.classList.remove(this._inputErrorClass);
    inputErrorMessageEl.textContent = "";
    inputErrorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEL) {
    if (!inputEL.validity.valid) {
      this._showInputError(inputEL, inputEL.validationMessage);
    } else {
      this._hasInvalidInput(inputEL);
    }
  }

  _hasInvalidInput() {
    return this._inputEls.some((inputEL) => {
      return !inputEL.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitBtn.classList.add(this._inactiveButtonClass);
      this._submitBtn.disabled = true;
    } else {
      this._submitBtn.classList.remove(this._inactiveButtonClass);
      this._submitBtn.disabled = false;
    }
  }

  enableValidation() {
    this._setEventListeners();
  }
}
export default FormValidator;
