import Card from "../components/Cards.js";
import FormValidator from "../components/FormValidator.js";

const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardAddModal = document.querySelector("#profile-add-modal");
const cardAddButton = document.querySelector("#add-button");
const cardCloseButton = cardAddModal.querySelector("#card-close-button");
const cardAddForm = document.querySelector("#add-card-form");
const cardPopup = document.querySelector("#picture-add-modal");
const cardPopupCloseButton = cardPopup.querySelector("#picture-close-button");

const cardPopupImg = cardPopup.querySelector(".modal__image");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = cardAddForm.querySelector(".modal__input_type_title");
const cardUrlInput = cardAddForm.querySelector(".modal__input_type_url");
const cardDisableButton = cardAddForm.querySelector("modal__button_disabled");
const cardPopUpCaption = cardPopup.querySelector(".modal__heading");

const addCardFormValidator = new FormValidator(validationConfig, cardAddForm);
const profileEditValidator = new FormValidator(
  validationConfig,
  profileEditForm
);

// Enable form validation
addCardFormValidator.enableValidation();
profileEditValidator.enableValidation();
/*Functions*/

function handleImageClick(data) {
  openPopup(cardPopup);
  cardPopupImg.src = data.link;
  cardPopupImg.alt = data.name;
  cardPopUpCaption.textContent = data.name;
}

//closepopup
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", closeModalOnEscape);
  modal.removeEventListener("click", closeModalOnClick);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeModalOnEscape);
  modal.addEventListener("click", closeModalOnClick);
}
function closeModalOnEscape(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopup(modal);
  }
}

function closeModalOnClick(e) {
  if (e.target.classList.contains("modal_opened")) {
    closePopup(e.target);
  }
}

/*
function closeModalOnEvent(event) {
  const modals = document.querySelectorAll(".modal");

  console.log("Event type:", event.type, event); // Log event type and event

  if (event.type === "keydown" && event.key === "Escape") {
    console.log("Escape key pressed");
    modals.forEach((modal) => {
      closePopup(modal);
      console.log("Closed modal on Escape key");
    });
  }

  if (event.type === "click") {
    console.log("Click event target:", event.target); // Log event target
    modals.forEach((modal) => {
      if (!modal.contains(event.target)) {
        closePopup(modal);
        console.log("Closed modal on click outside");
      }
    });
  }
}
*/

// Add event listeners
/*
document.addEventListener("keydown", closeModalOnEscape);
document.addEventListener("click", closeModalOnEv);*/

function handleProfileEditSubmit(e) {
  e.preventDefault.reset();
  e.target.reset();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  e.target.reset();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({
    name,
    link,
  });
  closePopup(cardAddModal);
  addCardFormValidator.toggleButtonState();
}

function renderCard(data) {
  cardListEl.prepend(createCard(data));
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.generateCard();
}

//Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => openPopup(cardAddModal));

profileCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

cardCloseButton.addEventListener("click", () => closePopup(cardAddModal));
console.log(cardCloseButton);

cardPopupCloseButton.addEventListener("click", () => closePopup(cardPopup));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleAddCardFormSubmit);
console.log(profileEditForm, cardAddForm);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
