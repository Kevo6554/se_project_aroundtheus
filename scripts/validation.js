console.log("hello from validation.js");
// enabling validation by calling enableValidation()
// pass all the settings on call
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMesssageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMesssageEl.textContent = inputEl.validationMessage;
  errorMesssageEl.classList.add(errorClass);
}



function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}

functionhasInvalidInput(inputList) {
    return inputList.every((inputEl) => inputEl.validity.valid)
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {

  if (hasInvalidInput) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }
  submitButton.classList.remove(inactiveButtonClass);
 (submitButton.disabled = true);
 return;
} 

function setEventListener(formEl, options) {
  const { inputSelector } = options;
  const submitButton = formEl.querySelector(".modal__button");
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEls.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}
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
