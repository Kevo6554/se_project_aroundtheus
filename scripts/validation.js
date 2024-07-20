console.log("hello from validation.js");

// enabling validation by calling enableValidation()

// pass all the settings on call

function showInputError(formEL, inputEL, options) {
  const selector = `${inputEL.id}-error`;
  console.log(`Selector: ${selector}`);
  const errorMessageEl = formEL.querySelector(`#${selector}`);
  if (!errorMessageEl) {
    console.error(`Element not found in the DOM: ${selector}`);
    return;
  }
  inputEL.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = inputEL.validationMessage;
  errorMessageEl.classList.add(options.errorClass);
}
function hideInputError(formEL, inputEL, options) {
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
function hasInvalidInput(inputEls) {
  return Array.from(inputEls).some((inputEl) => !inputEl.validity.valid);
}

function toggleButtonState(inputEls, submitBtn, options) {
  if (hasInvalidInput(inputEls)) {
    submitBtn.classList.add(options.inactiveButtonClass);
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove(options.inactiveButtonClass);
    submitBtn.disabled = false;
  }
}

const setEventListeners = (formEl, options) => {
  const { inputSelector, submitButtonSelector } = options;

  const submitButton = formEl.querySelector(submitButtonSelector);
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  toggleButtonState(inputEls, submitButton, options);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
};
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
enableValidation(config);
function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];

  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}
