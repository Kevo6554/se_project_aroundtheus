console.log("hello from validation.js");

// enabling validation by calling enableValidation()

// pass all the settings on call
function showInputError(
  formEL,
  inputEL,
  errorMessageEL,
  inputErrorClass,
  errorClass
) {
  const errorMessageEl = formEL.querySelector(`#${inputEL.id}-error`);
  inputEL.classList.add(inputErrorClass);
  errorMessageEL.textContent = inputEL.validationMessage;
  errorMessageEL.classList.add(errorClass);
}

function hideInputError(formEL, inputEL, inputErrorClass, errorClass) {
  const errorMessageEl = formEL.querySelector(`#${inputEL.id}-error`);
  inputEL.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
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
  const inputEl = [...formEl.querySelectorAll(options.inputSelector)];
  inputEl.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEl, submitButton, options);
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
