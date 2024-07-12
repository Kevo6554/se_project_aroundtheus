console.log("hello from validation.js");

// enabling validation by calling enableValidation()

// pass all the settings on call
function showInputError(formEL, inputEL, options) {
  const errorMessageEl = formEL.querySelector(`#${inputEL.id}-error`);
  inputEL.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = inputEL.validationMessage;
  errorMessageEl.classList.add(options.errorClass);
}

function hideInputError(formEL, inputEL, inputErrorClass, errorClass) {
  const errorMessageEl = formEL.querySelector(`#${inputEL.id}-error`);
  inputEL.classList.remove(options.inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(options.errorClass);
}

function checkInputValidity(formEL, inputEL, options) {
  if (!inputEL.validity.valid) {
    return showInputError(formEL, inputEL, options);
  }
  hideInputError(formEL, inputEL, options);
}

function hasInvalidInput(inputList) {
  return inputList.every((inputEL) => inputEL.validity.valid);
}
function enableButton() {
  submitBtn.classList.add(inactiveButtonClass);
  submitBtn.disabled = true;
}

function disableButton() {
  submitBtn.classList.remove(inactiveButtonClass);
  submitBtn.disabled = false;
}

function toggleButtonState(inputEls, submitBtn, inactiveButtonClass) {
  if (hasInvalidInput(inputEls)) {
    submitBtn.classList.add(inactiveButtonClass);
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove(inactiveButtonClass);
    submitBtn.disabled = false;
  }
}

const setEventListeners = (formEl, options) => {
  const { inputSelector } = options.inputSelector;

  const submitButton = formEl.querySelector(".modal__button");
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
};
function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];

  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
